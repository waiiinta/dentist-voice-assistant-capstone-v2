const ToothTable = require("./teeth/ToothTable.js");

const fs = require("fs");
const webrtc = require("wrtc");
const { RTCAudioSink } = require("wrtc").nonstandard;
const express = require("express");
const https = require("https");
const http = require("http");
const { Server } = require("socket.io");
const gowajee_service = require("./utils/gowajee_service.js");
const dotenv = require("dotenv");
dotenv.config({ path: `./${process.env.NODE_ENV}.env` });
dotenv.config();
console.log(
  `Staring Backend Streaming Server in ${process.env.NODE_ENV} mode...`
);
// console.log(process.env)
const RATE = 48000; // Sample rate of the input audio

// gRPC Denpendencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { log } = require("console");

// Load Gowajee proto for gRPC
const SPEECH2TEXT_PROTO_PATH = "./proto/speech2text.proto";
let speech2text_packageDefinition = protoLoader.loadSync(
  SPEECH2TEXT_PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
let speech2text_protoc = grpc.loadPackageDefinition(
  speech2text_packageDefinition
).gowajee.speech.speech2text;

// Load NER Backend proto for gRPC
const NER_PROTO_PATH = "./proto/ner_model.proto";
let ner_packageDefinition = protoLoader.loadSync(NER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
let ner_protoc = grpc.loadPackageDefinition(ner_packageDefinition).ner_backend;

// Initialize Socket
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const app = express();
const server =
  env === "production"
    ? https.createServer(
        {
          key: fs.readFileSync("key.pem"),
          cert: fs.readFileSync("cert.pem"),
        },
        app
      )
    : http.createServer(app);
const io = new Server(server, {
  // Create CORS, in order to give an access to front-end server
  cors: {
    // origin: `${process.env.NODE_ENV === "production" ? "https" : "http"}://${process.env.CLIENT_IP}:${process.env.CLIENT_PORT}`,
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Open Socket Connection
io.on("connection", async (socket) => {
  // Initialize parameter in socket section
  let sink = null;
  let audioTrack = null;
  let is_record = false;
  let gowajee_call = null;
  let ner_call = null;
  let old_command = null;
  let old_q = null;
  let old_i = null;
  let old_side = "";
  let old_position = "";
  let toothTable = new ToothTable();

  console.log(
    "socket id:",
    socket.id,
    ", userId:",
    socket.handshake.query.userId
  );

  // Connect to gRPC Gowajee Streaming Backend
  let gowajee_stub = new speech2text_protoc.GowajeeSpeechToText(
    // `dns:gowajee:${process.env.GOWAJEE_PORT}`,
    `${process.env.GOWAJEE_IP}:${process.env.GOWAJEE_PORT}`,
    grpc.credentials.createInsecure()
  );

  // Connect to NER Backend
  let ner_stub = new ner_protoc.NERBackend(
    // `dns:backend_ner:${process.env.NER_BACKEND_PORT}`,
    `${process.env.NER_BACKEND_IP}:${process.env.NER_BACKEND_PORT}`,
    grpc.credentials.createInsecure()
  );

  // Create RTC peer connection and send server candidate to client
  const RTC_CONFIG = {
    iceServers: [
      {
        urls: "stun:a.relay.metered.ca:80",
      },
      {
        urls: "turn:a.relay.metered.ca:80",
        username: process.env.OPEN_RELAY_USERNAME,
        credential: process.env.OPEN_RELAY_CREDENTIAL,
      },
      {
        urls: "turn:a.relay.metered.ca:80?transport=tcp",
        username: process.env.OPEN_RELAY_USERNAME,
        credential: process.env.OPEN_RELAY_CREDENTIAL,
      },
      {
        urls: "turn:a.relay.metered.ca:443",
        username: process.env.OPEN_RELAY_USERNAME,
        credential: process.env.OPEN_RELAY_CREDENTIAL,
      },
      {
        urls: "turn:a.relay.metered.ca:443?transport=tcp",
        username: process.env.OPEN_RELAY_USERNAME,
        credential: process.env.OPEN_RELAY_CREDENTIAL,
      },
    ],
  };

  const pc = new webrtc.RTCPeerConnection(RTC_CONFIG);
  pc.onicecandidate = ({ candidate }) => {
    socket.emit("candidate", candidate);
  };

  // Set SDP and answer to client
  socket.on("offer", async (offer) => {
    await pc.setRemoteDescription(offer);
    await pc.setLocalDescription(await pc.createAnswer());
    socket.emit("answer", pc.localDescription);
  });

  // When receive candidate from client, then add candidate to iceCandidate
  socket.on("candidate", async (candidate) => {
    if (candidate) {
      await pc.addIceCandidate(candidate);
    }
  });

  // When client send start record
  socket.on("start_record", async () => {
    console.log(`[${socket.id}] start streaming`);
    is_record = true;
  });

  // When client send stop record
  socket.on("stop_record", async () => {
    console.log(`[${socket.id}] stop streaming`);
    is_record = false;
  });

  // When client undo missing
  socket.on("undo_missing", async (toothData) => {
    if (!!ner_call) {
      tooth = { first_zee: toothData.q, second_zee: toothData.i };
      ner_request = gowajee_service.init_ner_request();
      ner_request.undo_missing = tooth;
      ner_call.write(ner_request);
      toothTable.updateValue(toothData.q, toothData.i, "Missing", false);
    }
  });

  // When client add missing
  socket.on("add_missing", async (toothData) => {
    if (!!ner_call) {
      tooth = { first_zee: toothData.q, second_zee: toothData.i };
      ner_request = gowajee_service.init_ner_request();
      ner_request.add_missing = tooth;
      ner_call.write(ner_request);
      toothTable.updateValue(toothData.q, toothData.i, "Missing", true);
    }
  });

  // When disconnect end the streaming
  socket.on("disconnect", () => {
    console.log("disconnect");
    if (sink) {
      sink.stop();
      gowajee_call.cancel();
      ner_call.cancel();
      sink = null;
    }
  });

  // When new audio track is added, then assign audio track
  pc.ontrack = (event) => {
    // Initilize Parameter for Gowajee Streaming Stub
    request = gowajee_service.init_streaming_request();

    // Create call instance for callling an streaming transcribe method (stub module)
    gowajee_call = gowajee_stub.StreamingTranscribe((err, response) => {
      if (err) console.log(err);
    });

    ner_call = ner_stub.StreamingNER((err, response) => {
      if (err) console.log(err);
    });

    // Query new audio track
    audioTrack = event.streams[0].getAudioTracks()[0];
    // Convert AudioTrack type to mp3/wav format
    sink = new RTCAudioSink(audioTrack);
    // When new data coming, send to Gowajee server
    sink.ondata = (data) => {
      if (data.samples.buffer && is_record) {
        // Send request to Gowajee if is_record is true!!
        request.audio_data = new Uint8Array(data.samples.buffer); // set request's audio data to the income audio
        gowajee_call.write(request); // send/call for streaming transcribe method
      }
    };

    // When receive response from Gowajee Server, Send it to ner backend server
    gowajee_call
      .on("data", (response) => {
        ner_request = gowajee_service.init_ner_request();
        ner_request.results = response.results;
        ner_request.is_final = response.is_final;
        ner_request.version = response.version;
        ner_request.duration = response.duration;
        ner_call.write(ner_request);
      })
      .once("error", (error) => {
        console.log("end grpc streaming : GOWAJEE");
        console.log(error);
      });

    ner_call
      .on("data", (response) => {
        // console.log(response.response);
        let semanticList = response.response;
        console.log(semanticList);
        let isUpdate = false;
        semanticList.forEach(async (semantic) => {
          // console.log("this is semantic:",semantic)
          mode = semantic.command;
          // pd_re_bop = ["PDRE", "BOP"];
          // mo_mgj = ["MO", "MGJ"];
          side_depend = ["PDRE", "PD", "RE", "BOP", "SUP"];
          side_not_depend = ["MO", "MGJ", "FUR"];

          // console.log(semantic.data);
          if (!semantic.is_complete || ["Missing", "Undo","Bridge","Crown","Implant"].includes(mode)) {
            q = null;
            i = null;
            if (mode != "Undo" && !(semantic.data.zee === null)) {
              q = semantic.data.zee.first_zee;
              i = semantic.data.zee.second_zee;
            } else if (
              mode === "Missing" &&
              semantic.data.missing.length != 0
            ) {
              let missing = semantic.data.missing;

              q = missing[missing.length - 1].first_zee;
              i = missing[missing.length - 1].second_zee;
              tooth_side = semantic.data.tooth_side;
              position = semantic.data.position;
            } else if (mode === "Undo") {
              let sem = semantic.undo;
              if (sem.command == "Bridge") {
                q = sem.bridge.zee[0].first_zee;
                i = sem.bridge.zee[0].second_zee;
              } else {
                q = sem.zee.first_zee;
                i = sem.zee.second_zee;
              }
            }else if(mode == "Bridge"){
              let bridge = semantic.data.bridge
              q = bridge.length > 0? bridge[bridge.length-1].zee[0].first_zee:null
              i = bridge.length > 0? bridge[bridge.length-1].zee[0].second_zee:null
            }else if (mode == "Crown"){
              let crown = semantic.data.crown
              q = crown.length > 0? crown[crown.length-1].first_zee:null
              i = crown.length > 0? crown[crown.length-1].second_zee:null
              
            }else if (mode == "Implant"){
              let implant = semantic.data.implant
              q = implant.length > 0? implant[implant.length-1].first_zee:null
              i = implant.length > 0? implant[implant.length-1].second_zee:null
            }
            tooth_side = semantic.data ? semantic.data.tooth_side : null;
            position = semantic.data ? semantic.data.position : null;

            if (
              !(old_command === mode) ||
              !(q === old_q) ||
              !(i === old_i) ||
              !(tooth_side === old_side) ||
              !(old_position === position)
            ) {
              // console.log("pass here")
              sendUpdateDisplayToFrontEnd(
                socket,
                mode,
                q,
                i,
                tooth_side,
                position
              );
              // Clear the ToothValue when start a command to handle the repeat tooth value problem.
              // if ([mode === "PDRE"] && !!q && !!i && !!tooth_side) {
              if (
                ["PDRE", "PD", "RE"].includes(mode) &&
                !!q &&
                !!i &&
                !!tooth_side
              ) {
                toothTable.clearToothValue(q, i, mode, tooth_side);
              } else if (mode === "MGJ" && !!q && !!i) {
                toothTable.clearToothValue(q, i, mode);
              }
            }

            old_command = mode;
            old_q = q;
            old_i = i;
            old_side = tooth_side;
            old_position = position;
            let missing_length = semantic.data
              ? semantic.data.missing.length
              : 0;
            if (
              !["Missing", "Undo","Bridge","Crown","Implant"].includes(mode) ||
              (missing_length == 0 && mode === "Missing")
            ) {
              return;
            }

          }
          let is_pdre = false;
          if (side_depend.includes(mode)) {
            side = semantic.data.tooth_side.toLowerCase();
            position = semantic.data.position.toLowerCase();
            q = semantic.data.zee.first_zee;
            i = semantic.data.zee.second_zee;

            if (mode === "PDRE") {
              target = semantic.data.payload;
              mode = semantic.data.is_number_PD ? "PD" : "RE";
              is_pdre = true;
            } else if (mode === "PD") {
              target = semantic.data.payload;
              mode = "PD";
            } else if (mode === "RE") {
              target = semantic.data.payload;
              mode = "RE";
            } else {
              target = semantic.data.BOP_payload;
              // target = semantic.data.payload;
            }

            // console.log(mode, q, i, side, position, '-->', target)
            let next_tooth = null;
            // toothTable.updateValue(q, i, mode, target, side, position);
            if (toothTable.updateValue(q, i, mode, target, side, position)) {
              if (
                mode === "RE" &&
                (((((q === 1 || q === 3) && side === "buccal") ||
                  ((q === 2 || q === 4) && side === "lingual")) &&
                  position === "mesial") ||
                  ((((q === 1 || q === 3) && side === "lingual") ||
                    ((q === 2 || q === 4) && side === "buccal")) &&
                    position === "distal"))
              ) {
                next_tooth = toothTable.findNextAvailableTooth(q, i, side);
              }
              sendUpdateToothTableDataToFrontEnd(
                socket,
                q,
                i,
                mode,
                target,
                side,
                position,
                next_tooth,
                null,
                null,
                null,
                is_pdre
              );
              if (next_tooth) {
                toothTable.clearToothValue(
                  next_tooth.q,
                  next_tooth.i,
                  "PDRE",
                  side
                );
              }
            }
            // } else if (mo_mgj.includes(mode)) {
          } else if (side_not_depend.includes(mode)) {
            q = semantic.data.zee.first_zee;
            i = semantic.data.zee.second_zee;
            target = semantic.data.payload;

            // console.log(mode, q, i, '-->', target)
            let next_tooth = null;
            let position = null;
            if (mode === "FUR") {
              position = semantic.data.position.toLowerCase();
            }
            if (toothTable.updateValue(q, i, mode, target, null, position)) {
              if (mode === "MGJ") {
                next_tooth = toothTable.findNextAvailableTooth(q, i, "buccal");
              }
              sendUpdateToothTableDataToFrontEnd(
                socket,
                q,
                i,
                mode,
                target,
                (side = null),
                (position = position),
                (next_tooth = next_tooth)
              );
              if (next_tooth) {
                toothTable.clearToothValue(next_tooth.q, next_tooth.i, mode);
              }
            }
          } else if (mode === "Missing") {
            console.log("missing", semantic);
            missing_list = semantic.data.missing;
            missing_list.forEach((missing_tooth) => {
              q = missing_tooth.first_zee;
              i = missing_tooth.second_zee;
              target = true;

              console.log(mode, q, i, "-->", target);
              if (toothTable.updateValue(q, i, mode, target))
                sendUpdateToothTableDataToFrontEnd(socket, q, i, mode, target);
            });
          } else if (mode === "Crown") {
            // console.log(semantic.data)
            crown_list = semantic.data.crown;
            crown_list.forEach((crown_tooth) => {
              q = crown_tooth.first_zee;
              i = crown_tooth.second_zee;
              target = true;

              // console.log(mode, q, i, '-->', target)
              if (toothTable.updateValue(q, i, mode, target))
                sendUpdateToothTableDataToFrontEnd(socket, q, i, mode, target);
            });
          } else if (mode === "Implant") {
            implant_list = semantic.data.implant;
            implant_list.forEach((implant_tooth) => {
              q = implant_tooth.first_zee;
              i = implant_tooth.second_zee;
              target = true;

              // console.log(mode, q, i, '-->', target)
              if (toothTable.updateValue(q, i, mode, target))
                sendUpdateToothTableDataToFrontEnd(socket, q, i, mode, target);
            });
          } else if (mode === "Bridge") {
            bridge_list = semantic.data.bridge;
            bridge_list.forEach((bridge_tooth) => {
              console.log(bridge_tooth);
              let bridges = bridge_tooth.zee;
              q = bridges[0].first_zee;
              i = bridges[0].second_zee;
              q2 = bridges[1].first_zee;
              i2 = bridges[1].second_zee;
              target = true;

              // console.log(mode, q, i, '-->', target)
              if (toothTable.updateValue(q, i, mode, target))
                sendUpdateToothTableDataToFrontEnd(
                  socket,
                  q,
                  i,
                  mode,
                  target,
                  (side = null),
                  (position = null),
                  (next_tooth = null),
                  q2,
                  i2
                );
            });
          } else if (mode === "Undo") {
            q = semantic.undo.zee ? semantic.undo.zee.first_zee : null;
            i = semantic.undo.zee ? semantic.undo.zee.second_zee : null;
            q2 = null;
            i2 = null;
            target = true;
            side = semantic.undo.tooth_side.toLowerCase();
            position = semantic.undo.position.toLowerCase();
            undo_mode = semantic.undo.command;
            if (undo_mode == "Missing") {
              missing_tooth = semantic.undo.zee;
              q = missing_tooth.first_zee;
              i = missing_tooth.second_zee;
              missing_target = false;

              console.log(mode, undo_mode, q, i, "-->", missing_target);
              toothTable.updateValue(q, i, undo_mode, missing_target);
            }

            if (undo_mode == "Bridge") {
              q = semantic.undo.bridge.zee[0].first_zee;
              i = semantic.undo.bridge.zee[0].second_zee;
              q2 = semantic.undo.bridge.zee[1].first_zee;
              i2 = semantic.undo.bridge.zee[1].second_zee;
              target = false;
              let start = i < i2 ? i : i2;
              let end = i2 > i ? i2 : i;
              for(let index = start;index <= end;index++){
                toothTable.updateValue(q, index, undo_mode, target)
              }
              
            }
            console.log(semantic.undo.command);
            sendUpdateToothTableDataToFrontEnd(
              socket,
              q,
              i,
              mode,
              target,
              side,
              position,
              null,
              q2,
              i2,
              undo_mode
            );
          }
          // toothTable.showPDREValue();
          // console.log("pass here 3")
        });
      })
      .once("error", (error) => {
        console.log("end grpc streaming : NER");
        console.log(error);
      });
  };
});

const sendUpdateToothTableDataToFrontEnd = (
  socket,
  q,
  i,
  mode,
  target,
  side = null,
  position = null,
  next_tooth = null,
  q2 = null,
  i2 = null,
  undo_mode = null,
  is_pdre = null
) => {
  data = {
    q,
    i,
    mode,
    target,
    side,
    position,
    next_tooth,
    q2,
    i2,
    undo_mode,
    is_pdre,
  };
  // console.log("data", data);
  socket.emit("data", data);
};

const sendUpdateDisplayToFrontEnd = (
  socket,
  command,
  q,
  i,
  tooth_side,
  position = null
) => {
  data = { command, q, i, tooth_side, position };
  // console.log("update_command", data);
  socket.emit("update_command", data);
};

server.listen(process.env.WRTC_SERVER_PORT, () => {
  console.log(`listening on *:${process.env.WRTC_SERVER_PORT}`);
});
