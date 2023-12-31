import { PedidoInterface, UpdatePedidoInterface } from "../types/interface";
import { PrismaClient } from "@prisma/client";
import { PedidoDTO, createPedidoSchema } from "../types/dtos";
import { BadRequestError } from "../helpers/errors";
const prisma = new PrismaClient();
import fs from "fs";
import { promisify } from "util";
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
            pedido_imagens: true,
         },
      });
      if (!pedido) {
         throw new Error("No order found with this id");
      }
      return pedido;
   }

   async createPedido(pedido: PedidoInterface): Promise<PedidoDTO> {
      try {
         await createPedidoSchema.validate(pedido);
         const findCliente = await prisma.clientes.findUnique({
            where: { id: Number(pedido.cliente_id) },
         });
         if (!findCliente) {
            throw new BadRequestError(
               "Error creating order. the clientId provided does belong to any client"
            );
         }
         const newPedido = await prisma.pedidos.create({ data: pedido });
         return newPedido;
      } catch (error: any) {
         if (error.errors) {
            throw new BadRequestError(error?.errors?.[0]);
         }
         throw error;
      }
   }

   async updatePedido(pedido: UpdatePedidoInterface): Promise<PedidoDTO> {
      try {
         const findPedido = await prisma.pedidos.findUnique({
            where: { id: Number(pedido.id) },
         });
         if (!findPedido) {
            throw new BadRequestError("No order found with this id");
         }
         const updatedPedidoObj = {
            id: Number(findPedido.id),
            cliente_id: Number(pedido.cliente_id),
            data: new Date(pedido.data),
            produto: pedido.produto,
            valor: Number(pedido.valor),
            ativo: Number(pedido.ativo),
            pedido_status_id: Number(pedido.pedido_status_id),
         };

         const updatedPedido = await prisma.pedidos.update({
            where: { id: findPedido.id },
            data: updatedPedidoObj,
         });
         return updatedPedido;
      } catch (error: any) {
         if (error.errors) {
            throw new BadRequestError(error.errors[0]);
         }
         throw error;
      }
   }

   async deletePedido(pedidoId: number): Promise<PedidoDTO> {
      try {
         const findPedido = await prisma.pedidos.findUnique({
            where: { id: pedidoId },
         });
         if (!findPedido) {
            throw new BadRequestError("No order found with this id");
         }
         const deletedPedidoObj = {
            id: Number(pedidoId),
            cliente_id: Number(findPedido.cliente_id),
            data: new Date(findPedido.data),
            produto: findPedido.produto,
            valor: findPedido.valor,
            ativo: 0,
            pedido_status_id: findPedido.pedido_status_id,
         };

         const deletedPedido = await prisma.pedidos.update({
            where: { id: deletedPedidoObj.id },
            data: deletedPedidoObj,
         });
         return deletedPedido;
      } catch (error: any) {
         throw error;
      }
   }

   async exportPedidos(): Promise<string> {
      try {
         const writeFileAsync = promisify(fs.writeFile);
         const pedidos = await prisma.pedidos.findMany();
         const csvData = pedidos
            .map((row) => Object.values(row).join(","))
            .join("\n");

         const csvHeader = Object.keys(pedidos[0]).join(",");
         const csvContent = `${csvHeader}\n${csvData}`;
         console.log(csvContent, "csvContent");
         return csvContent;
         // const outputPath = "output.csv";
         // await writeFileAsync(outputPath, csvContent, "utf-8");

         // return outputPath;
      } catch (error) {
         console.error("Error exporting CSV:", error);
         throw error;
      }
   }
}
