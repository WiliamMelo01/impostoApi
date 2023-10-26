-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "renda_mensal" REAL NOT NULL,
    "aliquota" REAL NOT NULL,
    "taxa_mensal" REAL NOT NULL
);
