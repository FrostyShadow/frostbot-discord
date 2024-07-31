/*
  Warnings:

  - A unique constraint covering the columns `[guildId,configKey]` on the table `ServerConfiguration` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ServerConfiguration_guildId_configKey_idx";

-- CreateIndex
CREATE UNIQUE INDEX "ServerConfiguration_guildId_configKey_key" ON "ServerConfiguration"("guildId", "configKey");
