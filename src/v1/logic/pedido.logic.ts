import { Request, Response } from "express";
import { PedidoDTO, createPedidoSchema } from "../types/dtos";
import { PedidoInterface } from "../types/interface";
import { PedidoStatusEnum } from "../types/enums";
import { PedidoRepository } from "../repositories";
import { BadRequestError } from "../helpers/errors";

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
         const { produto, valor, data, imagem } = req.body;
         const { clienteId } = req.params;

         const newPedido: PedidoInterface = {
            cliente_id: Number(clienteId),
            data: new Date(data),
            produto: produto,
            valor: valor,
            ativo: 1,
            pedido_status_id: 1,
         };
         await createPedidoSchema.validate(newPedido);
         const response = await this.repository.createPedido(newPedido);

         return response;
      } catch (error: any) {
         if (error.errors) {
            throw new BadRequestError(error.errors);
         }
         throw error;
      }
   }

   async updatePedido(req: Request, res: Response): Promise<PedidoDTO> {
      try {
         const { produto, valor, data, imagens, pedido_status_id } = req.body;
         const { clienteId, pedidoId } = req.params;
         if (
            !Object.values(PedidoStatusEnum).includes(Number(pedido_status_id))
         ) {
            throw new BadRequestError(
               "Invalid pedido_status value, Pedido Status must be: 1 - Solicitado | 2 - Concluído | 3 - Cancelado"
            );
         }
         if (Number(valor).toFixed(2).replace(".", "").length > 10) {
            throw new BadRequestError(
               "Invalid valor. Valor must have at most 10 characters."
            );
         }
         const updatedPedido = {
            id: Number(pedidoId),
            cliente_id: Number(clienteId),
            data: new Date(data),
            produto: produto,
            valor: valor,
            imagens: imagens,
            pedido_status_id: pedido_status_id,
         };

         const response = await this.repository.updatePedido(updatedPedido);
         return response;
      } catch (error: any) {
         if (error.errors) {
            throw new BadRequestError(error.errors);
         }
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

   async exportPedidos(req: Request, res: Response): Promise<string> {
      try {
         const response = await this.repository.exportPedidos();
         return response;
      } catch (error) {
         throw error;
      }
   }
}
