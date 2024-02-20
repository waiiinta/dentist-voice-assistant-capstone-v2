// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_ner_model_pb = require('../proto/ner_model_pb.js');

function serialize_ner_backend_Empty(arg) {
  if (!(arg instanceof proto_ner_model_pb.Empty)) {
    throw new Error('Expected argument of type ner_backend.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ner_backend_Empty(buffer_arg) {
  return proto_ner_model_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ner_backend_NERRequest(arg) {
  if (!(arg instanceof proto_ner_model_pb.NERRequest)) {
    throw new Error('Expected argument of type ner_backend.NERRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ner_backend_NERRequest(buffer_arg) {
  return proto_ner_model_pb.NERRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ner_backend_NERResponse(arg) {
  if (!(arg instanceof proto_ner_model_pb.NERResponse)) {
    throw new Error('Expected argument of type ner_backend.NERResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ner_backend_NERResponse(buffer_arg) {
  return proto_ner_model_pb.NERResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ner_backend_Zee(arg) {
  if (!(arg instanceof proto_ner_model_pb.Zee)) {
    throw new Error('Expected argument of type ner_backend.Zee');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ner_backend_Zee(buffer_arg) {
  return proto_ner_model_pb.Zee.deserializeBinary(new Uint8Array(buffer_arg));
}


var NERBackendService = exports.NERBackendService = {
  streamingNER: {
    path: '/ner_backend.NERBackend/StreamingNER',
    requestStream: true,
    responseStream: true,
    requestType: proto_ner_model_pb.NERRequest,
    responseType: proto_ner_model_pb.NERResponse,
    requestSerialize: serialize_ner_backend_NERRequest,
    requestDeserialize: deserialize_ner_backend_NERRequest,
    responseSerialize: serialize_ner_backend_NERResponse,
    responseDeserialize: deserialize_ner_backend_NERResponse,
  },
  undoMissing: {
    path: '/ner_backend.NERBackend/UndoMissing',
    requestStream: false,
    responseStream: false,
    requestType: proto_ner_model_pb.Zee,
    responseType: proto_ner_model_pb.Empty,
    requestSerialize: serialize_ner_backend_Zee,
    requestDeserialize: deserialize_ner_backend_Zee,
    responseSerialize: serialize_ner_backend_Empty,
    responseDeserialize: deserialize_ner_backend_Empty,
  },
  addMissing: {
    path: '/ner_backend.NERBackend/AddMissing',
    requestStream: false,
    responseStream: false,
    requestType: proto_ner_model_pb.Zee,
    responseType: proto_ner_model_pb.Empty,
    requestSerialize: serialize_ner_backend_Zee,
    requestDeserialize: deserialize_ner_backend_Zee,
    responseSerialize: serialize_ner_backend_Empty,
    responseDeserialize: deserialize_ner_backend_Empty,
  },
};

exports.NERBackendClient = grpc.makeGenericClientConstructor(NERBackendService);
