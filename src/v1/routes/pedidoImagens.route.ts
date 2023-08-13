import { NextFunction, Request, Response, Router } from "express";
import { PedidoImagensController } from "../controllers";
import upload from "../helpers/multer";

const controller = new PedidoImagensController();
const router = Router();

router
   .route("/pedidos/:pedidoId/pedidoImagem/:pedidoImagemId")
   .put(
      upload.single("file"),
      async (req: Request, res: Response, next: NextFunction) => {
         await controller.putPedidoImagens(req, res, next);
      }
   );

router
   .route("/pedidoImagem/:pedidoImagemId")
   .delete(async (req: Request, res: Response, next: NextFunction) => {
      await controller.deletePedidoImagens(req, res, next);
   });
router
   .route("/pedidos/:pedidoId/pedidoImagem")
   .post(
      upload.single("file"),
      async (req: Request, res: Response, next: NextFunction) => {
         controller.uploadPedidoImage(req, res, next);
      }
   );

export { router as PedidoImagensRouter };
