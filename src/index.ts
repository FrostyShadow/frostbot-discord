import { ActivityType, Client, Colors, EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import { config } from "./config";
import { guildCommands } from "./commands/guild-commands";
import { deployGuildCommands, deployGlobalCommands } from "./deploy-commands";
import pino from "pino";
import { globalCommands } from "./commands/global-commands";
import { database } from "./database";
import { userQueries } from "./database/user-queries";
import { User } from "./models/user";

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

// Initialize logger for database
const databaseClient = database.client;
databaseClient.init(logger);

// Configure client
const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages", "GuildMembers", "GuildPresences"],
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

client.on("guildMemberAdd", (member) => {
  logger.debug(`${member.displayName} joined ${member.guild.name}!`);
  const embed = new EmbedBuilder()
    .setAuthor({name: member.user.tag, iconURL: member.displayAvatarURL()}) // Show the Discord tag of the new member and it's avatar
    .setTitle("Member joined") // Title of the embed
    .setDescription(`${member.displayName}`) // Description of the embed
    .setTimestamp()
    .setColor(Colors.Blue)
    .setFooter({text: `ID: ${member.id}`});
  const user = new User();
  user.userId = member.id;
  user.guildId = member.guild.id;
  user.joinDate = member.joinedAt ?? new Date();
  userQueries.addUser.main(user, databaseClient.client)
    .then(async () => {
      await databaseClient.client.$disconnect();
    })
    .catch(async (e) => {
      logger.error(e);
      await databaseClient.client.$disconnect();
    });
  
  const channel = member.guild.channels.cache.find((channel) => channel.name === "welcome") as GuildTextBasedChannel;
  channel.send({embeds: [embed]});
});

client.on("guildMemberRemove", (member) => {
  logger.debug(`${member.displayName} left ${member.guild.name}!`);
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
