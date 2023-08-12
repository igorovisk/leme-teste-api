/*
  Warnings:

  - The primary key for the `pedidos_status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `pedidos_status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `pedido_status_id` on the `pedidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "pedidos_pedido_status_id_fkey";

-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "pedido_status_id",
ADD COLUMN     "pedido_status_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pedidos_status" DROP CONSTRAINT "pedidos_status_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "pedidos_status_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_status_id_key" ON "pedidos_status"("id");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_pedido_status_id_fkey" FOREIGN KEY ("pedido_status_id") REFERENCES "pedidos_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
