import express from "express";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";

import * as dotnev from "dotenv";
dotnev.config({ path: __dirname + "/.env" });

import { CommonRoutesConfig } from "./common/common.routes.config";
import { UserRoutes } from "./users/users.routes.config";
import debug from "debug";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

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

routes.push(new UserRoutes(app));

const runningMessage = `server running at port ${PORT}`;
server.listen(PORT, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`configured route: ${route.getName()}`);
  });
  console.log(runningMessage);
});

export default app;
