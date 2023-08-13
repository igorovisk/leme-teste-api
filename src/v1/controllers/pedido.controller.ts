import { Request, Response, NextFunction } from "express";
import { PedidoLogic } from "../logic";

export class PedidoController {
   private logic: PedidoLogic;

   constructor() {
      this.logic = new PedidoLogic();
   }

   async getAllPedidos(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getAllPedidos(req, res);
      return res.status(200).send(response);
   }

   async getPedidoById(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getPedidoById(req, res);
      return res.status(200).send(response);
   }

   async createPedido(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.createPedido(req, res);
      return res.status(200).send(response);
   }

   async putPedido(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.updatePedido(req, res);
      return res.status(200).send(response);
   }

   async deletePedido(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.deletePedido(req, res);
      return res.status(200).send(response);
   }

   async exportPedidos(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.exportPedidos(req, res);
      return res.status(200).send(response);
   }
}
