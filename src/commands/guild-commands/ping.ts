import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Logger } from "pino";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(
  interaction: CommandInteraction,
  logger: Logger<never>,
) {
  logger.debug("Executing command /ping");
  return interaction.reply("Pong!");
}
