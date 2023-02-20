const express = require("express");
const router = express.Router();
import * as userController from "./controllers/User";
import * as nuzlockeController from "./controllers/Nuzlocke";

// Users
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);

// Nuzlockes
router.get("/nuzlockes", nuzlockeController.getNuzlockes);

module.exports = router;
