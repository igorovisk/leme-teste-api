import "express-async-errors";
import express, { Express, Request, Response, json } from "express";
import { ClienteRouter, PedidoRouter, PedidoImagensRouter } from "./v1/routes";
import { errorMiddleware } from "./v1/middlewares";
require("dotenv").config();
const port = process.env.PORT;
var cors = require("cors");

const corsOrigin = {
   origin: true,
   credentials: true,
   optionSuccessStatus: 200,
};

const app = express();
export class Server {
   static async init(app: Express) {
      app.listen(port, () => console.info(`Server started on port ${port}`));
   }
}

app.get("/", function (req: Request, res: Response) {
   res.send("Server running...");
});

app.use(cors(corsOrigin));
app.use(json());
app.use(ClienteRouter, PedidoRouter, PedidoImagensRouter);
app.use(errorMiddleware);

Server.init(app);
