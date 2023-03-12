const express = require("express");
const router = express.Router();
import { validateToken } from "./middlewares/validateToken";
import * as authController from "./controllers/auth";
import * as userController from "./controllers/user";
import * as nuzlockeController from "./controllers/nuzlocke";

// Login / Session
router.post("/login", authController.login);
router.post("/session", validateToken, authController.session);

// Users
router.get("/users", userController.getUsers);      // Change to specific user get
router.post("/users", userController.createUser);

// Nuzlockes
router.get("/nuzlockes", nuzlockeController.getNuzlockes);

module.exports = router;
