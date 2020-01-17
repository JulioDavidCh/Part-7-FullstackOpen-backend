require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let jwtPassword = process.env.SECRET

module.exports = {
  PORT,
  MONGODB_URI,
  jwtPassword
}