import { Request, Response } from "express";
import { PedidoDTO } from "../types/dtos";
import { PedidoInterface } from "../types/interface";
import { PedidoStatusEnum } from "../types/enums";
import { PedidoRepository } from "../repositories";
import { BadRequestError } from "../../helpers/errors";

export class PedidoLogic {
   private repository: PedidoRepository;
   constructor() {
      this.repository = new PedidoRepository();
   }

   async getAllPedidos(req: Request, res: Response): Promise<PedidoDTO[]> {
      try {
         const response = await this.repository.getAllPedidos();
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getPedidoById(req: Request, res: Response): Promise<PedidoDTO | {}> {
      try {
         const { pedidoId } = req.params;
         const response = await this.repository.getPedidoById(Number(pedidoId));
         return response;
      } catch (error) {
         throw error;
      }
   }

   async createPedido(req: Request, res: Response): Promise<PedidoDTO> {
      try {
         const { produto, valor, data, ativo } = req.body;
         const { clienteId } = req.params;

         const newPedido: PedidoInterface = {
            cliente_id: Number(clienteId),
            data: new Date(data),
            produto: produto,
            valor: valor,
            ativo: ativo,
            pedido_status_id: 1,
         };

         const response = await this.repository.createPedido(newPedido);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async updatePedido(req: Request, res: Response): Promise<PedidoDTO> {
      try {
         const { produto, valor, data, ativo, imagens, pedido_status } =
            req.body;
         const { clienteId, pedidoId } = req.params;

         if (!Object.values(PedidoStatusEnum).includes(pedido_status)) {
            throw new BadRequestError("Invalid pedido_status value");
         }
         const updatedPedido = {
            id: Number(pedidoId),
            cliente_id: Number(clienteId),
            data: new Date(data),
            produto: produto,
            valor: valor,
            ativo: ativo,
            imagens: imagens,
            pedido_status_id: pedido_status,
         };

         const response = await this.repository.updatePedido(updatedPedido);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async deletePedido(req: Request, res: Response): Promise<PedidoDTO> {
      try {
         const { pedidoId } = req.params;
         const response = await this.repository.deletePedido(Number(pedidoId));
         return response;
      } catch (error) {
         throw error;
      }
   }
}
