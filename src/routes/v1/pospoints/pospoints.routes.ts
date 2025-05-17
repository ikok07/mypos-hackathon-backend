import { Router } from "express";
import { catchErrors } from "../../../utils/catch-errors";
import { buyPospointsHandler } from "../../../handlers/pospoints/buy-pospoints.handler";

const pospointsRoutes = Router();

pospointsRoutes.get("/buy", catchErrors(buyPospointsHandler));
// pospointsRoutes.post("/", catchErrors(addPospointsHandler));
// pospointsRoutes.delete("/", catchErrors(removePospointsHandler));

export default pospointsRoutes;