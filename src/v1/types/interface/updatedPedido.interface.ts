export interface UpdatePedidoInput {
   produto: string;
   valor: number;
   data: string;
   ativo: number;
   imagens: string;
   pedido_status: PedidoStatusEnum;
}
