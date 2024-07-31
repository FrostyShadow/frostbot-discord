import { utils } from "../../utils";
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { Logger } from "pino";
import * as mcs from "node-mcstatus";

export const data = new SlashCommandBuilder()
  .setName("mcstatus")
  .setDescription("Gets the status of a minecraft server")
  .addStringOption((option) =>
    option
      .setName("server_address")
      .setDescription("Public address of the minecraft server")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("game_edition")
      .setDescription("Choose the edition of the game that the server uses")
      .setRequired(true)
      .addChoices(
        {
          name: "Java Edition",
          value: "java",
        },
        {
          name: "Bedrock Edition",
          value: "bedrock",
        },
      ),
  );

export async function execute(
  interaction: ChatInputCommandInteraction,
  logger: Logger<never>,
) {
  logger.debug("Executing command /mcstatus");
  const serverAddress = interaction.options.getString("server_address", true);
  const gameEdition = interaction.options.getString("game_edition", true);

  logger.debug(
    `Server address: ${serverAddress}, Game edition: ${gameEdition}`,
  );

  const serverStatus = await utils.serverStatus.getServerStatus(
    serverAddress,
    gameEdition,
  );
  if (!serverStatus) {
    logger.error("MC Status API Error");
    return interaction.reply(
      "An error has occured while fetching the status of the minecraft server.",
    );
  }

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Minecraft Server Status")
    .addFields(
      { name: "Server description", value: serverStatus.motd?.clean ?? "N/A" },
      {
        name: "Server version",
        value:
          (gameEdition == "java"
            ? (serverStatus as mcs.JavaStatusResponse).version?.name_clean
            : (serverStatus as mcs.BedrockStatusResponse).version?.name) ??
          "N/A",
        inline: true,
      },
      {
        name: "Players online",
        value: `${serverStatus.players?.online} / ${serverStatus.players?.max}`,
        inline: true,
      },
      {
        name: "Server status",
        value: serverStatus.online ? "online" : "offline",
        inline: true,
      },
      { name: "Server address", value: serverStatus.host },
    );

  return interaction.reply({ embeds: [embed] });
}
