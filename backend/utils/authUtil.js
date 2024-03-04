import crypto from "crypto"
import jwt from "jsonwebtoken";

export const hashUtil = async (method,token) =>{
    const hashedToken = crypto
    .createHash(method)
    .update(token)
    .digest("hex");

    return hashedToken
}

export const jwtGenerate = (fields) => {
  return jwt.sign(fields, process.env.JWT_SECRET, {
		expiresIn: "20d",
	});
}
