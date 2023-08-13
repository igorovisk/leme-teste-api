import { Request, Response } from "express";
import { PedidoImagensDTO } from "../types/dtos";
import { PedidoImagensRepository } from "../repositories";
import { BadRequestError } from "../../helpers/errors";
import upload from "../../helpers/multer";
import { resizeAndSaveImages } from "../../helpers/resizeImages";
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

   async createPedidoImagens(req: Request, res: Response): Promise<string> {
      try {
         const { pedidoId } = req.params;
         const { file } = req;
         console.log(req.files, "REQ FILES");
         console.log(req.file, "REQ FILE");
         if (!file) {
            throw new BadRequestError("No file..");
         }

         const imagem = {
            src: file.path,
         };

         // const images = [imagem, capa]
         // pedido_id: Number(pedidoId),
         // imagem: imagem,
         // capa: capa,
         // };
         const uploadHelper = upload.single(imagem.src);
         // await createPedidoImagensSchema.validate(imagem);

         // if (response) {
         //    const imagemObj = {
         //       pedido_id: response.id,
         //       imagem: "imagem",
         //       capa: "capa",
         //    };
         //    console.log(imagemObj, "response");
         // }

         // const response = await this.repository.createPedidoImagens(imagem);
         return "response";
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
         console.log(updatedPedidoImagens, "CCCCC");
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
         console.log(data, "data");
         return this.repository.createPedidoImagens(data);
      } catch (error: any) {
         if (error.errors) {
            throw new BadRequestError(error.errors);
         }
         throw error;
      }
   }
}
