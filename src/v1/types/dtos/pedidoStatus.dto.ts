import { Pedidos } from "@prisma/client";

export interface PedidoStatusDTO {
   id: string;
   descricao: string;
   pedido_id: Pedidos[];
}
