import { Router } from "express";
import { catchErrors } from "../../../utils/catch-errors";
import { getProfileBalanceHandler } from "../../../handlers/profile-balances/get-profile-balance.handler";

const profileBalancesRoutes = Router();

profileBalancesRoutes.get("/:userId", catchErrors(getProfileBalanceHandler));

export default profileBalancesRoutes;