import { Router } from "express";
import clerkRoutes from "./clerk.routes";
import bodyParser from "body-parser";
import myposRoutes from "./mypos.routes";

const webhooksRoutes = Router();

webhooksRoutes.use(bodyParser.raw({type: "application/json"}));

webhooksRoutes.use("/clerk", clerkRoutes);
webhooksRoutes.use("/mypos", myposRoutes);

export default webhooksRoutes;