import {config} from "dotenv"

config()

const env_config = {
  NODE_ENV : process.env.NODE_ENV? process.env.NODE_ENV:"development",
  SERVER_PORT: process.env.SERVER_PORT? process.env.SERVER_PORT: 3000,
  JWT_SECRET: process.env.JWT_SECRET? process.env.JWT_SECRET : "my-ultra-secure-and-ultra-long-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN? process.env.JWT_EXPIRES_IN:'90d',
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN? process.env.JWT_COOKIE_EXPIRES_IN:'15',
  FRONTEND_IP: process.env.FRONTEND_IP? process.env.FRONTEND_IP:'localhost',
  FRONTEND_PORT: process.env.FRONTEND_PORT? process.env.FRONTEND_PORT: 5001,
  DATABASE_LOCAL: process.env.DATABASE_LOCAL? process.env.DATABASE_LOCAL:"localhost",
  DATABASE_PORT : process.env.DATABASE_PORT? process.env.DATABASE_PORT:5432,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME? process.env.EMAIL_USERNAME: 'modunkung@gmail.com',   
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD? process.env.EMAIL_PASSWORD: 'lgjbbyqwsjqvruzd',
  EMAIL_HOST: process.env.EMAIL_HOST? process.env.EMAIL_HOST:'smtp.mailtrap.io',
  EMAIL_PORT: process.env.EMAIL_PORT? process.env.EMAIL_PORT:25,
  BACKEND_WEB_RTC_IP: process.env.BACKEND_WEB_RTC_IP? process.env.BACKEND_WEB_RTC_IP:'localhost',
  BACKEND_WEB_RTC_PORT: process.env.BACKEND_WEB_RTC_PORT? process.env.BACKEND_WEB_RTC_PORT:3001
}

export default env_config