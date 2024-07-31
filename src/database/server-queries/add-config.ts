import { PrismaClient, Prisma } from "@prisma/client";
import { ServerConfiguration } from "../../models/serverConfiguration";

export async function main(data: ServerConfiguration, client: PrismaClient) {
    const config: Prisma.ServerConfigurationCreateInput = ServerConfiguration.toInputEntity(data);

    await client.serverConfiguration.create({ data: config });
}