import { Router } from "express";
const router = Router();
import {getAllTeams,getByIdTeams,createTeams, updateTeams,deleteTeam} from "../controller/teamsController.js";
import { simulateMatchController } from "../controller/simulationController.js";

router.get("",getAllTeams);
router.get("/:id",getByIdTeams);
router.post("",createTeams);
router.put("/:id",updateTeams);
router.delete("/:id",deleteTeam);
router.post("/simulate", simulateMatchController);

export default router