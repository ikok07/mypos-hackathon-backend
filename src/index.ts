import express from "express";
import serverConfig from "./config/config";
import rootRouter from "./routes/index.routes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(rootRouter);

app.listen(serverConfig?.port, () => {
    console.log(`Server running on port: ${serverConfig?.port}`);
});