const express = require("express");
const router = express.Router();
import * as userController from "./controllers/User";
import * as nuzlockeController from "./controllers/Nuzlocke";

router.get("/users", userController.getUsers);
router.get("/nuzlockes", nuzlockeController.getNuzlockes);

module.exports = router;
