import { PrismaClient } from "@prisma/client";
import { ServerConfiguration } from "../../models/serverConfiguration";

export async function execute(data: ServerConfiguration, client: PrismaClient) {
    const config = await client.serverConfiguration.findFirst({
        where: {
            AND: {
                guidId: data.guildId,
                configKey: data.configKey
            }
        }
    });

    return config;
}