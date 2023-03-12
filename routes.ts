const express = require("express");
const router = express.Router();
import * as userController from "./controllers/User";
import * as nuzlockeController from "./controllers/Nuzlocke";

// Login
router.post("/login", userController.loginUser);

// Users
router.get("/users", userController.getUsers);      // Change to specific user get
router.post("/users", userController.createUser);

// Nuzlockes
router.get("/nuzlockes", nuzlockeController.getNuzlockes);

module.exports = router;
