import crypto from "crypto"
import jwt from "jsonwebtoken";
import env from "../config/config.js"

export const hashUtil = async (method,token) =>{
    const hashedToken = crypto
    .createHash(method)
    .update(token)
    .digest("hex");

    return hashedToken
}

export const jwtGenerate = (fields) => {
  return jwt.sign(fields, env.JWT_SECRET, {
		expiresIn: "20d",
	});
}
