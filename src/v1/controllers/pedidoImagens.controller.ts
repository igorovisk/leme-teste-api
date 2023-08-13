import { Request, Response, NextFunction } from "express";
import { PedidoImagensLogic } from "../logic";

export class PedidoImagensController {
   private logic: PedidoImagensLogic;

   constructor() {
      this.logic = new PedidoImagensLogic();
   }

   async getAllPedidoImagens(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getAllPedidoImagens(req, res);
      return res.status(200).send(response);
   }

   async getPedidoImagensById(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getPedidoImagensById(req, res);
      return res.status(200).send(response);
   }

   async createPedidoImagens(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.createPedidoImagens(req, res);
      return res.status(200).send(response);
   }

   async putPedidoImagens(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.updatePedidoImagens(req, res);
      return res.status(200).send(response);
   }

   async deletePedidoImagens(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.deletePedidoImagens(req, res);
      return res.status(200).send(response);
   }
}
