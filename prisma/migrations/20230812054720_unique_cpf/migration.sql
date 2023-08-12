-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(15) NOT NULL,
    "data_nasc" TIMESTAMP(3) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "ativo" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "produto" VARCHAR(255) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "pedido_status_id" TEXT NOT NULL,
    "ativo" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos_imagens" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "imagem" VARCHAR(255) NOT NULL,
    "capa" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_imagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos_status" (
    "id" TEXT NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "pedidos_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_id_key" ON "clientes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_id_key" ON "pedidos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_imagens_id_key" ON "pedidos_imagens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_status_id_key" ON "pedidos_status"("id");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_pedido_status_id_fkey" FOREIGN KEY ("pedido_status_id") REFERENCES "pedidos_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos_imagens" ADD CONSTRAINT "pedidos_imagens_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
