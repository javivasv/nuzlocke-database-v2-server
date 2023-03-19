const express = require("express");
const router = express.Router();
import { validateToken } from "./middlewares/validateToken";
import * as authController from "./controllers/auth";
import * as userController from "./controllers/user";
import * as nuzlockeController from "./controllers/nuzlocke";
import * as pokemonController from "./controllers/pokemon";
import * as videoController from "./controllers/video";

// Login / Session
router.post("/login", authController.login);
router.post("/session", validateToken, authController.session);

// Users
router.get("/users", userController.getUsers);      // Change to specific user get
router.post("/users", userController.createUser);

// Nuzlockes
router.get("/nuzlockes", validateToken, nuzlockeController.getNuzlockes);
router.post("/nuzlockes", validateToken, nuzlockeController.createNuzlocke);
router.get("/nuzlocke/:id", validateToken, nuzlockeController.getNuzlocke);

// Pokemon
router.post("/nuzlocke/:id/pokemon", validateToken, pokemonController.addPokemon);

// Videos
router.get("/videos", videoController.getVideos);

module.exports = router;
