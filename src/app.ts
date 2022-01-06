import express from "express";
import * as http from "http";
import * as path from "path";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";

import * as dotnev from "dotenv";
dotnev.config({ path: path.join(__dirname, "..", ".env") });

import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./users/users.routes.config";
import { AuthRoutes } from "./auth/auth.routes.config";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const routes: Array<CommonRoutesConfig> = [];

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(express.json());
app.use(cors());
app.use(expressWinston.logger(loggerOptions));

routes.push(new AuthRoutes(app));
routes.push(new UsersRoutes(app));

server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

export default app;
