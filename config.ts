import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
}
