import { ClienteDTO } from "../interfaces/dtos";
import { ClienteInterface } from "../interfaces";
import { Pedidos, PrismaClient } from "@prisma/client";
import { BadRequestError } from "../../helpers/errors";

const prisma = new PrismaClient();

type UpdatedClienteDate = {
   id: number;
   nome: string;
   cpf: string;
   data_nasc: Date;
   telefone: string;
   ativo: number;
};

export class ClienteRepository {
   async getClientes(): Promise<ClienteDTO[]> {
      try {
         const clientes = await prisma.clientes.findMany({
            include: {
               pedidos: true,
            },
         });

         return clientes;
      } catch (error: any) {
         throw new BadRequestError(error.message);
      }
   }

   async getClienteById(id: number): Promise<ClienteDTO | {}> {
      try {
         const cliente = await prisma.clientes.findUnique({
            where: { id: id },
            include: {
               pedidos: true,
            },
         });
         if (!cliente) {
            return {};
         }
         return cliente;
      } catch (error: any) {
         throw new BadRequestError(error.message);
      }
   }

   async createCliente(cliente: ClienteInterface): Promise<ClienteDTO> {
      try {
         const newcliente = await prisma.clientes.create({ data: cliente });
         return newcliente;
      } catch (error: any) {
         throw new BadRequestError(error.message);
      }
   }

   async updateCliente(
      updatedclienteData: UpdatedClienteDate
   ): Promise<ClienteDTO> {
      try {
         const updatedCliente = await prisma.clientes.update({
            where: { id: updatedclienteData.id },
            data: updatedclienteData,
         });

         return updatedCliente;
      } catch (error: any) {
         throw new BadRequestError(error.message);
      }
   }

   async getClienteByCpf(cpf: string): Promise<ClienteDTO> {
      try {
         if (!cpf) {
            throw new BadRequestError("Cpf is missing..");
         }
         const user = await prisma.clientes.findFirst({
            where: {
               cpf: cpf,
            },
         });
         if (!user) {
            throw new BadRequestError("No client found");
         }
         return user;
      } catch (error) {
         throw error;
      }
   }
}
