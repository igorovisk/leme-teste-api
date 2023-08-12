import { Pedidos } from "@prisma/client";
import { PedidoDTO } from "./dtos";

export interface ClienteInterface {
   id?: number;
   nome: string;
   cpf: string;
   data_nasc: Date;
   telefone: string;
   ativo: number;
}
