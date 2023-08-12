import { Pedidos } from "@prisma/client";
import { PedidoDTO } from "./pedido.dto";

export interface ClienteDTO {
   id: number;
   nome: string;
   cpf: string;
   data_nasc: Date;
   telefone: string;
   ativo: number;
   pedidos?: Pedidos[];
   createdAt?: Date;
   updatedAt?: Date;
}
