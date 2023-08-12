import { Pedidos } from "@prisma/client";
import { PedidoDTO } from "./pedido.dto";

export interface PedidoStatusDTO {
   id: string;
   descricao: string;
   pedidos: Pedidos[];
}
