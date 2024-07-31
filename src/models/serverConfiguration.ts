import { Prisma } from "@prisma/client";

export class ServerConfiguration {
    public guildId: string;
    public configKey: string;
    public configValue: string;

    static toInputEntity(config: ServerConfiguration) {
        const entity: Prisma.ServerConfigurationCreateInput = {
            guildId: config.guildId,
            configKey: config.configKey,
            configValue: config.configValue
        };

        return entity;
    }
}