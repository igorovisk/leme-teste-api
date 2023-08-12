import { Request, Response } from "express";
import { ClienteDTO, userSchema } from "../types/dtos";
import { ClienteRepository } from "../repositories";
import { BadRequestError } from "../../helpers/errors";

export class ClienteLogic {
   private repository: ClienteRepository;

   constructor() {
      this.repository = new ClienteRepository();
   }

   async getClientes(req: Request, res: Response): Promise<ClienteDTO[]> {
      try {
         const response = await this.repository.getClientes();
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getClienteByCpf(req: Request, res: Response): Promise<ClienteDTO> {
      try {
         const response = await this.repository.getClienteByCpf(req.body.cpf);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getClienteById(req: Request, res: Response): Promise<ClienteDTO | {}> {
      try {
         const { clienteId } = req.params;
         const response = await this.repository.getClienteById(
            Number(clienteId)
         );
         return response;
      } catch (error) {
         throw error;
      }
   }

   async createCliente(req: Request, res: Response): Promise<ClienteDTO> {
      try {
         const { nome, cpf, data_nasc, telefone } = req.body;
         const newCliente = {
            nome: nome,
            cpf: cpf,
            data_nasc: new Date(data_nasc),
            telefone: telefone,
            ativo: 1,
         };

         const validate = await userSchema.validate(newCliente);

         const response = await this.repository.createCliente(newCliente);
         return response;
      } catch (error: any) {
         if (error.errors) {
            throw new BadRequestError(error.errors);
         }
         throw error;
      }
   }
   async updateCliente(
      req: Request,
      res: Response
   ): Promise<ClienteDTO | undefined> {
      try {
         const { nome, cpf, data_nasc, telefone, ativo } = req.body;

         const updatedCliente = {
            id: Number(req.params.clienteId),
            nome: nome,
            cpf: cpf,
            data_nasc: new Date(data_nasc),
            telefone: telefone,
            ativo: ativo,
         };

         const response = await this.repository.updateCliente(updatedCliente);
         return response;
      } catch (error) {
         throw error;
      }
   }
   async deleteCliente(req: Request, res: Response): Promise<ClienteDTO> {
      try {
         const { clienteId } = req.params;
         const response = await this.repository.deleteCliente(
            Number(clienteId)
         );
         return response;
      } catch (error) {
         throw error;
      }
   }
}
