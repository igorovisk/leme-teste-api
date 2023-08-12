import { PedidoInterface } from "../types/interface";
import { PrismaClient } from "@prisma/client";
import { PedidoDTO } from "../types/dtos";
import { BadRequestError } from "../../helpers/errors";
const prisma = new PrismaClient();

export class PedidoRepository {
   async getAllPedidos(): Promise<PedidoDTO[]> {
      const pedidos = await prisma.pedidos.findMany();
      return pedidos;
   }

   async getPedidoById(id: number): Promise<PedidoDTO | {}> {
      const pedido = await prisma.pedidos.findUnique({
         where: {
            id: id,
         },
         include: {
            pedido_status: true,
         },
      });
      if (!pedido) {
         throw new Error("No order found with this id");
      }
      return pedido;
   }

   async createPedido(pedido: PedidoInterface): Promise<PedidoDTO> {
      const newPedido = await prisma.pedidos.create({ data: pedido });
      return newPedido;
   }

   async updatePedido(pedido: PedidoInterface): Promise<PedidoDTO> {
      const updatedPedido = await prisma.pedidos.update({
         where: { id: pedido.id },
         data: pedido,
      });
      return updatedPedido;
   }

   async deletePedido(pedidoId: number): Promise<PedidoDTO> {
      try {
         const findPedido = await prisma.pedidos.findUnique({
            where: { id: pedidoId },
         });
         if (!findPedido) {
            throw new BadRequestError("No order found with this id");
         }
         const deletedPedido = await prisma.pedidos.delete({
            where: { id: pedidoId },
         });
         return deletedPedido;
      } catch (error: any) {
         throw error;
      }
   }
}
