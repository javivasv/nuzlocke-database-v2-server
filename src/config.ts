const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 1337;

export const config = {
  server: {
    port: PORT,
  }
}