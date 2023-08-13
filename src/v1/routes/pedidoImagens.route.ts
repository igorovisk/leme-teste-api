import { NextFunction, Request, Response, Router } from "express";
import { PedidoImagensController } from "../controllers";
import upload from "../../helpers/multer";

const controller = new PedidoImagensController();
const router = Router();

router
   .route("/pedidoImagens")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await controller.getAllPedidoImagens(req, res, next);
   });

router
   .route("/pedidos/:pedidoId/pedidoImagem/:pedidoImagemId")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await controller.getPedidoImagensById(req, res, next);
   });

router
   .route("/pedidos/:pedidoId/pedidoImagem")
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
router
   .route("/fileupload/pedidos/:pedidoId/pedidoImagem")
   .post(
      upload.single("file"),
      (req: Request, res: Response, next: NextFunction) => {
         controller.uploadPedidoImage(req, res, next);
      }
   );

export { router as PedidoImagensRouter };
