import { Request, Response } from "express";
import { PedidoImagensDTO } from "../types/dtos";
import { PedidoImagensRepository } from "../repositories";
import { BadRequestError } from "../helpers/errors";
import upload from "../helpers/multer";
import { resizeAndSaveImages } from "../helpers/resizeImages";
export class PedidoImagensLogic {
   private repository: PedidoImagensRepository;
   constructor() {
      this.repository = new PedidoImagensRepository();
   }

   async updatePedidoImagens(
      req: Request,
      res: Response
   ): Promise<PedidoImagensDTO> {
      try {
         const { pedidoId, pedidoImagemId } = req.params;
         const { file } = req;
         if (!file) {
            throw new BadRequestError("No file..");
         }
         const capa = await resizeAndSaveImages(file);
         const data = {
            id: Number(pedidoImagemId),
            imagem: file.path,
            pedido_id: Number(pedidoId),
            capa: capa,
         };
         const response = await this.repository.updatePedidoImagens(data);
         return response;
      } catch (error: any) {
         if (error.errors) {
            throw new BadRequestError(error.errors);
         }
         throw error;
      }
   }

   async deletePedidoImagens(
      req: Request,
      res: Response
   ): Promise<PedidoImagensDTO> {
      try {
         const { pedidoImagemId } = req.params;
         const response = await this.repository.deletePedidoImagens(
            Number(pedidoImagemId)
         );
         return response;
      } catch (error) {
         throw error;
      }
   }

   async uploadPedidoImage(req: Request, res: Response) {
      try {
         const { pedidoId } = req.params;
         const { file } = req;
         if (!file) {
            throw new BadRequestError("No file..");
         }
         const capa = await resizeAndSaveImages(file);
         const data = {
            imagem: file.path,
            pedido_id: Number(pedidoId),
            capa: capa,
         };
         return this.repository.uploadPedidoImage(data);
      } catch (error: any) {
         if (error.errors) {
            throw new BadRequestError(error.errors);
         }
         throw error;
      }
   }
}
