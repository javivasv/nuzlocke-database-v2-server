const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors")
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

mongoose
  .connect("mongodb://localhost:27017/ndb", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(cors({
      origin: "*",
    }));
    app.use(express.json());
    app.use("/api", routes);

    app.listen(5000, () => {
      console.log(`
        ###     ##  #######    ########
        ####    ##  ##   ###   ###   ###
        ## ##   ##  ##    ###  ###   ###
        ##  ##  ##  ##     ##  ########
        ##   ## ##  ##    ###  ###   ###
        ##    ####  ##   ###   ###   ###
        ##     ###  #######    ########
      `);
    });
  });