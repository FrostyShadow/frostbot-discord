import { REST, Routes } from "discord.js";
import { config } from "./config";
import { guildCommands } from "./commands/guild-commands";
import { globalCommands } from "./commands/global-commands";
import { Logger } from "pino";

const guildCommandsData = Object.values(guildCommands).map(
  (command) => command.data,
);
const globalCommandsData = Object.values(globalCommands).map(
  (command) => command.data,
);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = {
  guildId: string;
};

export async function deployGlobalCommands(logger: Logger<never>) {
  try {
    logger.info("Started refreshing application global (/) commands.");

    await rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), {
      body: globalCommandsData,
    });

    logger.info("Successfully reloaded application global (/) commands.");
  } catch (error) {
    logger.error(error);
  }
}

export async function deployGuildCommands(
  { guildId }: DeployCommandsProps,
  logger: Logger<never>,
) {
  try {
    logger.info("Started refreshing application guild (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      {
        body: guildCommandsData,
      },
    );

    logger.info("Successfully reloaded application guild (/) commands.");
  } catch (error) {
    logger.error(error);
  }
}
