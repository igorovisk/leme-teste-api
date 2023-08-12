import { Router, Request, Response, NextFunction } from "express";
import { ClienteController } from "../controllers";

const controller = new ClienteController();
const router = Router();

router
   .route("/clientes")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await controller.getClientes(req, res, next);
   });

router
   .route("/clientes/:clienteId")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await controller.getClienteById(req, res, next);
   });

router
   .route("/clientes/:clienteId")
   .put(async (req: Request, res: Response, next: NextFunction) => {
      await controller.updateCliente(req, res, next);
   });

router
   .route("/clientes")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      await controller.createCliente(req, res, next);
   });

export { router as ClienteRouter };
