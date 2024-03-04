import mongoose from "mongoose";
import env from "../config/config.js"

console.log(env.DATABASE_LOCAL);
export default function SyncDatabase() {
  const db_config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
	try {
		mongoose
			.connect(env.DATABASE_LOCAL, db_config)
			.then(() => {
				console.log("DB connection successful!");
			});
	} catch (error) {
    console.log(error)
    throw(error)
  }
}
