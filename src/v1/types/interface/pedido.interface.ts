import { Decimal } from "@prisma/client/runtime";

export interface PedidoInterface {
   id?: number;
   produto: string;
   valor: Decimal;
   data: Date;
   ativo: number;
   cliente_id: number;
   pedido_status_id: number;
}
