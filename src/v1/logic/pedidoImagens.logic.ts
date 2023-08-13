import { Request, Response } from "express";
import { PedidoImagensDTO } from "../types/dtos";
import { PedidoImagensRepository } from "../repositories";
import { BadRequestError } from "../../helpers/errors";
import { PedidoImagensInterface } from "../types/interface";

export class PedidoImagensLogic {
   private repository: PedidoImagensRepository;
   constructor() {
      this.repository = new PedidoImagensRepository();
   }

   async getAllPedidoImagens(
      req: Request,
      res: Response
   ): Promise<PedidoImagensDTO[]> {
      try {
         const response = await this.repository.getAllPedidoImagens();
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getPedidoImagensById(
      req: Request,
      res: Response
   ): Promise<PedidoImagensDTO | {}> {
      try {
         const { pedidoId } = req.params;
         const response = await this.repository.getPedidoImagensById(
            Number(pedidoId)
         );
         return response;
      } catch (error) {
         throw error;
      }
   }

   async createPedidoImagens(
      req: Request,
      res: Response
   ): Promise<PedidoImagensDTO> {
      try {
         const { imagem, capa } = req.body;
         const { pedidoId } = req.params;

         const newPedidoImagens: PedidoImagensInterface = {
            pedido_id: Number(pedidoId),
            imagem: imagem,
            capa: capa,
         };
         // await createPedidoImagensSchema.validate(newPedidoImagens);
         const response = await this.repository.createPedidoImagens(
            newPedidoImagens
         );

         if (response) {
            const imagemObj = {
               pedido_id: response.id,
               imagem: "imagem",
               capa: "capa",
            };
            console.log(imagemObj, "response");
         }
         return response;
      } catch (error: any) {
         if (error.errors) {
            throw new BadRequestError(error.errors);
         }
         throw error;
      }
   }

   async updatePedidoImagens(
      req: Request,
      res: Response
   ): Promise<PedidoImagensDTO> {
      try {
         const { imagem, capa } = req.body;
         const { pedidoId } = req.params;

         const updatedPedidoImagens = {
            pedido_id: Number(pedidoId),
            imagem: imagem,
            capa: capa,
         };

         const response = await this.repository.updatePedidoImagens(
            updatedPedidoImagens
         );
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
         const { pedidoId } = req.params;
         const response = await this.repository.deletePedidoImagens(
            Number(pedidoId)
         );
         return response;
      } catch (error) {
         throw error;
      }
   }
}
