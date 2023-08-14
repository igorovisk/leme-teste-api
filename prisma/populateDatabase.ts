import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function populate() {
   try {
      const statusData = [
         { descricao: "Solicitado" },
         { descricao: "Concluído" },
         { descricao: "Cancelado" },
      ];

      const existingStatuses = await prisma.pedidos_status.findMany();
      const existingStatusNames = existingStatuses.map(
         (status) => status.descricao
      );
      console.log("Runned");
      for (const status of statusData) {
         if (!existingStatusNames.includes(status.descricao)) {
            await prisma.pedidos_status.create({
               data: status,
            });
         }
      }

      console.log("end of populate");
   } catch (error) {
      throw error;
   } finally {
      await prisma.$disconnect();
   }
}

populate().catch((error) => {
   console.error(error);
   process.exit(1);
});
