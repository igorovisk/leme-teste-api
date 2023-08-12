import { Pedidos_imagens } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export interface PedidoDTO {
   id?: number;
   produto: string;
   valor: Decimal;
   data: Date;
   cliente_id: number;
   ativo: number;
   pedido_status_id: number;
   // pedido_imagens?: Pedidos_imagens[] | null;
   createdAt?: Date;
   updatedAt?: Date;
}
