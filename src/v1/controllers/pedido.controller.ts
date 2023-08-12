import { Request, Response, NextFunction } from "express";
import { PedidoLogic } from "../logic";

export class PedidoController {
   private logic: PedidoLogic;

   constructor() {
      this.logic = new PedidoLogic();
   }

   async getAllPedidos(req: Request, res: Response, next: NextFunction) {
      const routines = await this.logic.getAllPedidos(req, res);
      return res.status(200).send(routines);
   }

   async getPedidoById(req: Request, res: Response, next: NextFunction) {
      const routine = await this.logic.getPedidoById(req, res);
      return res.status(200).send(routine);
   }

   async createPedido(req: Request, res: Response, next: NextFunction) {
      const newPedido = await this.logic.createPedido(req, res);
      return res.status(200).send(newPedido);
   }

   async putPedido(req: Request, res: Response, next: NextFunction) {
      const updatedPedido = await this.logic.updatePedido(req, res);
      return res.status(200).send(updatedPedido);
   }

   async deletePedido(req: Request, res: Response, next: NextFunction) {
      const deletedPedido = await this.logic.deletePedido(req, res);
      return res.status(200).send(deletedPedido);
   }
}
