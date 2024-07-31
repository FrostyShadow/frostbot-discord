/*
  Warnings:

  - You are about to drop the column `guidId` on the `ServerConfiguration` table. All the data in the column will be lost.
  - Added the required column `guildId` to the `ServerConfiguration` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ServerConfiguration_guidId_configKey_idx";

-- AlterTable
ALTER TABLE "ServerConfiguration" DROP COLUMN "guidId",
ADD COLUMN     "guildId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "ServerConfiguration_guildId_configKey_idx" ON "ServerConfiguration"("guildId", "configKey");
