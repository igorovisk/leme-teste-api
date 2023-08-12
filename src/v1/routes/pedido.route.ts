import { NextFunction, Request, Response, Router } from "express";
import { PedidoController } from "../controllers";

const controller = new PedidoController();
const router = Router();

router
   .route("/clientes/:clienteId/pedidos")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await controller.getAllPedidos(req, res, next);
   });

router
   .route("/clientes/:clienteId/pedidos/:pedidoId")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await controller.getPedidoById(req, res, next);
   });

router
   .route("/clientes/:clienteId/pedidos")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      await controller.createPedido(req, res, next);
   });

router
   .route("/clientes/:clienteId/pedidos/:pedidoId")
   .put(async (req: Request, res: Response, next: NextFunction) => {
      await controller.putPedido(req, res, next);
   });

router
   .route("/clientes/:clienteId/pedidos/:pedidoId")
   .delete(async (req: Request, res: Response, next: NextFunction) => {
      await controller.deletePedido(req, res, next);
   });

export { router as PedidoRouter };
