import { PedidoImagensInterface } from "../types/interface";
import { PrismaClient } from "@prisma/client";
import { PedidoImagensDTO } from "../types/dtos";
import { BadRequestError } from "../helpers/errors";

const prisma = new PrismaClient();

export class PedidoImagensRepository {
   async uploadPedidoImage(
      data: PedidoImagensInterface
   ): Promise<PedidoImagensDTO> {
      const findPedido = await prisma.pedidos.findUnique({
         where: { id: data.pedido_id },
      });
      if (!findPedido) {
         throw new BadRequestError(
            "Error uploading this image. No pedido found with this id"
         );
      }
      const newPedidoImagens = await prisma.pedido_imagens.create({
         data: data,
      });
      return newPedidoImagens;
   }

   async updatePedidoImagens(
      data: PedidoImagensInterface
   ): Promise<PedidoImagensDTO> {
      const findPedido = await prisma.pedidos.findUnique({
         where: { id: data.pedido_id },
      });
      if (!findPedido) {
         throw new BadRequestError(
            "Error uploading this image. No pedido found with this id"
         );
      }
      const updatedPedidoImagens = await prisma.pedido_imagens.update({
         where: { id: data.id },
         data: data,
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
