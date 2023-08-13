import { Request, Response, NextFunction } from "express";
import { PedidoImagensLogic } from "../logic";

export class PedidoImagensController {
   private logic: PedidoImagensLogic;

   constructor() {
      this.logic = new PedidoImagensLogic();
   }

   async putPedidoImagens(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.updatePedidoImagens(req, res);
      return res.status(200).send(response);
   }

   async deletePedidoImagens(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.deletePedidoImagens(req, res);
      return res.status(200).send(response);
   }

   async uploadPedidoImage(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.uploadPedidoImage(req, res);
      res.status(200).send({ message: "File successfully upload", response });
   }
}
