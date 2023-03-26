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
router.get("/nuzlocke/:nuzlockeId", validateToken, nuzlockeController.getNuzlocke);
router.put("/nuzlocke/:nuzlockeId", validateToken, nuzlockeController.updateNuzlocke);

// Pokemon
router.post("/nuzlocke/:nuzlockeId/pokemon", validateToken, pokemonController.addPokemon);
router.put("/nuzlocke/:nuzlockeId/pokemon/:pokemonId", validateToken, pokemonController.updatePokemon);

// Videos
router.get("/videos", videoController.getVideos);

module.exports = router;
