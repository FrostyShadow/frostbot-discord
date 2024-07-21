import { ActivityType, Client } from "discord.js";
import { config } from "./config";
import { guildCommands } from "./commands/guild-commands";
import { deployGuildCommands, deployGlobalCommands } from "./deploy-commands";
import pino from "pino";
import { globalCommands } from "./commands/global-commands";

// Configure logging
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
if (config.ENVIRONMENT === "development") {
  logger.level = "debug";
} else {
  logger.level = "info";
}

// Configure client
const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", () => {
  logger.info(`Discord bot is ready! Logged in as: ${client.user?.username}`);
  setTimeout(async () => {
    await deployGlobalCommands(logger);
  }, 500);
});

client.on("guildAvailable", (guild) => {
  logger.debug(`Guild ID: ${guild.id}, Guild Name: ${guild.name}`);
  setTimeout(async () => {
    await deployGuildCommands({ guildId: config.TEST_GUILD_ID }, logger);
  }, 500);

  client.user?.setActivity("Your degenerate ass", {
    type: ActivityType.Watching,
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const { commandName } = interaction;
  if (guildCommands[commandName as keyof typeof guildCommands]) {
    guildCommands[commandName as keyof typeof guildCommands].execute(
      interaction,
      logger,
    );
  }
  if (globalCommands[commandName as keyof typeof globalCommands]) {
    globalCommands[commandName as keyof typeof globalCommands].execute(
      interaction,
      logger,
    );
  }
});

client.login(config.DISCORD_TOKEN);
