import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function populate() {
   const statusData = [
      { descricao: "Solicitado" },
      { descricao: "Concluído" },
      { descricao: "Cancelado" },
   ];

   for (const status of statusData) {
      await prisma.pedidos_status.create({
         data: status,
      });
   }
}

populate()
   .catch((error) => {
      console.error(error);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
