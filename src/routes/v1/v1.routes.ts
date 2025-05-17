import express, { Router } from "express";
import webhooksRoutes from "./webhooks/webhooks.routes";
import paymentsRoutes from "./payments/payments.routes";
import profilesRoutes from "./profiles/profiles.routes";
import pospointsRoutes from "./pospoints/pospoints.routes";
import loyaltyCardsRoutes from "./payments/loyalty-cards.routes";
import customerVisitsRoutes from "./customer-visits/customer-visits.routes";
import ordersRoutes from "./orders/orders.routes";
import receiptsRoutes from "./receipts/receipts.routes";
import profileBalancesRoutes from "./profile-balances/profile-balances.routes";
import { catchErrors } from "../../utils/catch-errors";
import { protectMiddleware } from "../../middleware/protect.middleware";

const v1Routes = Router();

v1Routes.use("/webhooks", webhooksRoutes);

v1Routes.use(express.json());
v1Routes.use(catchErrors(protectMiddleware));

v1Routes.use("/profiles", profilesRoutes);
v1Routes.use("/payments", paymentsRoutes);
v1Routes.use("/pospoints", pospointsRoutes);
v1Routes.use("/loyalty-cards", loyaltyCardsRoutes);
v1Routes.use("/customer-visits", customerVisitsRoutes);
v1Routes.use("/orders", ordersRoutes);
v1Routes.use("/receipts", receiptsRoutes);
v1Routes.use("/profile-balances", profileBalancesRoutes);

export default v1Routes;