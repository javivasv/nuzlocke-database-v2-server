const express = require("express");
const router = express.Router();
import { validateToken } from "./middlewares/validateToken";
import * as authController from "./controllers/auth";
import * as userController from "./controllers/user";
import * as nuzlockeController from "./controllers/nuzlocke";
import * as pokemonController from "./controllers/pokemon";
import * as teamController from "./controllers/team";
import * as videoController from "./controllers/video";
import * as suggestionController from "./controllers/suggestion";

// Login / Session
router.post("/login", authController.login);
router.post("/session", validateToken, authController.session);

// Users
router.post("/users", userController.createUser);

// Nuzlockes
router.get("/nuzlockes", validateToken, nuzlockeController.getNuzlockes);
router.post("/nuzlocke", validateToken, nuzlockeController.createNuzlocke);
router.get("/nuzlocke/:nuzlockeId", validateToken, nuzlockeController.getNuzlocke);
router.put("/nuzlocke/:nuzlockeId", validateToken, nuzlockeController.updateNuzlocke);
router.delete("/nuzlocke/:nuzlockeId", validateToken, nuzlockeController.deleteNuzlocke);

// Pokemon
router.post("/nuzlocke/:nuzlockeId/pokemon", validateToken, pokemonController.addPokemon);
router.put("/nuzlocke/:nuzlockeId/pokemon/:pokemonId", validateToken, pokemonController.updatePokemon);
router.delete("/nuzlocke/:nuzlockeId/pokemon/:pokemonId", validateToken, pokemonController.deletePokemon);

// Teams
router.post("/nuzlocke/:nuzlockeId/team", validateToken, teamController.addTeam);
router.put("/nuzlocke/:nuzlockeId/team/:teamId", validateToken, teamController.updateTeam);
router.delete("/nuzlocke/:nuzlockeId/team/:teamId", validateToken, teamController.deleteTeam);

// Videos
router.get("/videos", videoController.getVideos);

// Suggestions
router.post("/suggestions", suggestionController.sendSuggestion);

module.exports = router;
