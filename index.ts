const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const routes = require("./routes");
const config = require("./config");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(cors({
      origin: "*",
    }));
    app.use(express.json());
    app.use("/api", routes);

    app.listen(config.config.server.port, () => {
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