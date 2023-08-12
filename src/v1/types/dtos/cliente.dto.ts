import { Pedidos } from "@prisma/client";
import { object, string, number, date, InferType } from "yup";

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

export const userSchema = object({
   nome: string().required().min(3),
   cpf: string().required().min(11).max(15),
   data_nasc: date().max(new Date(), "Date of birth cannot be in the future"),
   telefone: string().max(15),
   ativo: number().min(1).max(1).required(),
});
