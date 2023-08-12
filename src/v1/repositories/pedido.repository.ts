import { PedidoInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
import { PedidoDTO } from "../interfaces/dtos";
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
      });
      if (!pedido) {
         return {};
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
      const deletedPedido = await prisma.pedidos.delete({
         where: { id: pedidoId },
      });
      return deletedPedido;
   }
}
