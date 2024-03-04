import fs from "fs";
import https from "https";
import app from "./app.js";
import env from "./config/config.js";
import SyncDatabase from "./models/database.js";

main()

async function main() {
	SyncDatabase();

  process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    console.log(err.stack);
    process.exit(1);
  });

	let server;
	if (env.NODE_ENV == "development") {
		server = app.listen(env.SERVER_PORT, () => {
			console.log(`Starting Backend Server in development mode...`);
			console.log(`server is runing at port ${env.SERVER_PORT}`);
		});
	} else {
		server = https
			.createServer(
				{
					key: fs.readFileSync("key.pem"),
					cert: fs.readFileSync("cert.pem"),
				},
				app
			)
			.listen(env.SERVER_PORT, () => {
				console.log(`Starting Backend Server in production mode...`);
				console.log(`server is runing at port ${env.SERVER_PORT}`);
			});
	}

	process.on("unhandledRejection", (err) => {
		console.log("UNHANDLED REJECTION! 💥 Shutting down...");
		console.log(err.name, err.message);
		server.close(() => {
			process.exit(1);
		});
	});
}
