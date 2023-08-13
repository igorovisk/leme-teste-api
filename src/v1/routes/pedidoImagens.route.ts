import { NextFunction, Request, Response, Router } from "express";
import { PedidoImagensController } from "../controllers";

const controller = new PedidoImagensController();
const router = Router();

router
   .route("/pedidos/pedidoImagens")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await controller.getAllPedidoImagens(req, res, next);
   });

router
   .route("/pedidos/:pedidoId/pedidoImagem")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await controller.getPedidoImagensById(req, res, next);
   });

router
   .route("/pedidos/:pedidoId")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      await controller.createPedidoImagens(req, res, next);
   });

router
   .route("/pedidos/:pedidoId/pedidoImagem/:pedidoImageId")
   .put(async (req: Request, res: Response, next: NextFunction) => {
      await controller.putPedidoImagens(req, res, next);
   });

router
   .route("/pedidos/:pedidoId/pedidoImagem/:pedidoImageId")
   .delete(async (req: Request, res: Response, next: NextFunction) => {
      await controller.deletePedidoImagens(req, res, next);
   });

export { router as PedidoImagensRouter };
