import { PedidoImagensInterface } from "../types/interface";
import { PrismaClient } from "@prisma/client";
import { PedidoImagensDTO } from "../types/dtos";
import { BadRequestError } from "../../helpers/errors";

const prisma = new PrismaClient();

export class PedidoImagensRepository {
   async getAllPedidoImagens(): Promise<PedidoImagensDTO[]> {
      const pedidos = await prisma.pedido_imagens.findMany();
      return pedidos;
   }

   async getPedidoImagensById(id: number): Promise<PedidoImagensDTO | {}> {
      const pedido = await prisma.pedidos.findUnique({
         where: {
            id: id,
         },
         include: {
            pedido_status: true,
            pedido_imagens: true,
         },
      });
      if (!pedido) {
         throw new Error("No order found with this id");
      }
      return pedido;
   }

   async createPedidoImagens(
      pedido: PedidoImagensInterface
   ): Promise<PedidoImagensDTO> {
      // await createPedidoImagensSchema.validate(pedido);
      const findPedido = await prisma.pedidos.findUnique({
         where: { id: pedido.id },
      });
      if (!findPedido) {
         throw new BadRequestError(
            "Error uploading this image. No pedido found with this id"
         );
      }
      const newPedidoImagens = await prisma.pedido_imagens.create({
         data: pedido,
      });
      return newPedidoImagens;
   }

   async updatePedidoImagens(
      pedido: PedidoImagensInterface
   ): Promise<PedidoImagensDTO> {
      const updatedPedidoImagens = await prisma.pedido_imagens.update({
         where: { id: pedido.id },
         data: pedido,
      });
      return updatedPedidoImagens;
   }

   async deletePedidoImagens(pedidoId: number): Promise<PedidoImagensDTO> {
      try {
         const findPedidoImagens = await prisma.pedido_imagens.findUnique({
            where: { id: pedidoId },
         });
         if (!findPedidoImagens) {
            throw new BadRequestError("No order found with this id");
         }

         const deletedPedidoImagens = await prisma.pedido_imagens.delete({
            where: { id: findPedidoImagens.id },
         });
         return deletedPedidoImagens;
      } catch (error: any) {
         throw error;
      }
   }
}
