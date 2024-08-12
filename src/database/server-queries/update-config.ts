import { PrismaClient } from "@prisma/client";
import { ServerConfiguration } from "../../models/serverConfiguration";

export async function execute(data: ServerConfiguration, client: PrismaClient) {
  await client.serverConfiguration.upsert({
    where: {
        guildId_configKey: {
          guildId: data.guildId,
          configKey: data.configKey
        }
    },
    create: ServerConfiguration.toInputEntity(data),
    update: {
        configValue: data.configValue
    }
  });
}
