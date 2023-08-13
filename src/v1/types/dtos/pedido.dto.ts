import { Pedido_imagens } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { object, string, number, date, array } from "yup";
export interface PedidoDTO {
   id: number;
   produto: string;
   valor: Decimal;
   data: Date;
   cliente_id: number;
   ativo: number;
   pedido_status_id: number;
   pedido_imagens?: Pedido_imagens[] | null;
   createdAt?: Date;
   updatedAt?: Date;
}
export const createPedidoSchema = object({
   produto: string().required("Produto is required").max(255),

   valor: number()
      .required("Valor is required")
      .transform((value, originalValue) => {
         const numericString = originalValue.toString().replace(/[^\d.-]/g, "");
         return parseFloat(numericString);
      })
      .test(
         "max-precision",
         "Valor must have at most 10 characters",
         (value) => {
            const stringValue = value.toString();
            return stringValue.replace(".", "").length <= 10;
         }
      ),

   data: date()
      .required("Date is required")
      .typeError("Data must be the format YYYY-MM-DD"),
   cliente_id: number().required("Cliente id is required"),
   pedido_status_id: number().required("Pedido_status_id is required"),
   pedido_imagens: array().typeError("Error on image"),
   ativo: number().min(1).max(1).required("Ativo status is required"),
});
