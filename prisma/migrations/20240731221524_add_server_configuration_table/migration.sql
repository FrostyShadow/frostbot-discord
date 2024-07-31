-- CreateTable
CREATE TABLE "ServerConfiguration" (
    "id" SERIAL NOT NULL,
    "guidId" TEXT NOT NULL,
    "configKey" TEXT NOT NULL,
    "configValue" TEXT NOT NULL,

    CONSTRAINT "ServerConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServerConfiguration_guidId_configKey_idx" ON "ServerConfiguration"("guidId", "configKey");
