import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Logger } from "pino";

export const data = new SlashCommandBuilder()
  .setName("hello")
  .setDescription("Replies with World!");

export async function execute(
  interaction: CommandInteraction,
  logger: Logger<never>,
) {
  logger.debug("Executing command /hello");
  return interaction.reply("World!");
}
