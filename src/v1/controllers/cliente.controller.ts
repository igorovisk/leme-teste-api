import { Request, Response, NextFunction } from "express";
import { ClienteLogic } from "../logic";

export class ClienteController {
   private logic: ClienteLogic;

   constructor() {
      this.logic = new ClienteLogic();
   }

   // async getMe(req: Request, res: Response, next: NextFunction) {
   //    const response = await this.logic.getMe(req, res);
   //    return res.status(200).send(response);
   // }

   async getClientes(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getClientes(req, res);
      return res.status(200).send(response);
   }
   async getClienteById(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getClienteById(req, res);
      return res.status(200).send(response);
   }

   async createCliente(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.createCliente(req, res);
      return res.status(200).send(response);
   }
   async updateCliente(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.updateCliente(req, res);
      return res.status(200).send(response);
   }
   async getClienteByCpf(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getClienteByCpf(req, res);
      return res.status(200).send(response);
   }
}
