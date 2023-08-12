import { ClienteDTO } from "../types/dtos";
import { ClienteInterface } from "../types/interface";
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

   async getClienteById(id: number): Promise<ClienteDTO> {
      try {
         const cliente = await prisma.clientes.findUnique({
            where: { id: id },
            include: {
               pedidos: true,
            },
         });
         if (!cliente) {
            throw new Error("Not client found with this id");
         }
         return cliente;
      } catch (error: any) {
         throw new BadRequestError(error.message);
      }
   }

   async createCliente(cliente: ClienteInterface): Promise<ClienteDTO> {
      try {
         const findUser = await prisma.clientes.findUnique({
            where: { cpf: cliente.cpf },
         });
         if (findUser) {
            throw new BadRequestError(
               "Error creating user. This cpf already is registered"
            );
         }
         const newcliente = await prisma.clientes.create({ data: cliente });
         return newcliente;
      } catch (error: any) {
         throw error;
      }
   }

   async updateCliente(
      updatedclienteData: UpdatedClienteDate
   ): Promise<ClienteDTO> {
      try {
         const findCliente = await prisma.clientes.findUnique({
            where: { id: updatedclienteData.id },
         });
         if (!findCliente) {
            throw new BadRequestError(
               "Error updating user. This user does not exist"
            );
         }
         const updatedCliente = await prisma.clientes.update({
            where: { id: findCliente.id },
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
         const user = await prisma.clientes.findUnique({
            where: {
               cpf: cpf,
            },
         });
         if (!user) {
            throw new BadRequestError("No client found with this cpf");
         }
         return user;
      } catch (error) {
         throw error;
      }
   }

   async deleteCliente(clienteId: number): Promise<ClienteDTO> {
      try {
         const findCliente = await prisma.clientes.findUnique({
            where: { id: clienteId },
         });
         console.log(findCliente, "findCliente");
         if (!findCliente) {
            console.log("caiu no erro");
            throw new BadRequestError("No client found with this id");
         }
         const deletedClientObject = {
            id: findCliente.id,
            nome: findCliente.nome,
            cpf: findCliente.cpf,
            data_nasc: findCliente.data_nasc,
            telefone: findCliente.telefone,
            ativo: 0,
         };

         const deletedCliente = await prisma.clientes.update({
            where: { id: deletedClientObject.id },
            data: deletedClientObject,
         });
         return deletedCliente;
      } catch (error) {
         throw error;
      }
   }
}
