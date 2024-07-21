import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import { Logger } from "pino";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Provides information about the user")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("User to fetch data from")
      .setRequired(false),
  );

export async function execute(
  interaction: ChatInputCommandInteraction,
  logger: Logger<never>,
) {
  logger.debug("Executing command /user");
  const user = interaction.options.getUser("user", false) ?? interaction.user;
  logger.debug(`User: ${user.username}, Avatar: ${user.displayAvatarURL()}`);
  const guildMember = await interaction.guild?.members.fetch(user.id);
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: user.username, iconURL: user.displayAvatarURL()
    })
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "User info", value: `ID: ${user.id}\nName: ${user.displayName}` },
      { name: "Joined Discord", value: `<t:${user.createdTimestamp}:f>` },
      { name: "Joined Server", value: `<t:${guildMember?.joinedTimestamp}:f>` },
    );
  return interaction.reply({ embeds: [embed] });
}
