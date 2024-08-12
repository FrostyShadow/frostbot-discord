import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import { Logger } from "pino";
import { helpers } from "../../helpers";

const hammertimeHelper = helpers.hammertimeHelper;

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

  // Fetch user data from command options
  const user = interaction.options.getUser("user", false) ?? interaction.user;
  logger.debug(`User: ${user.username}, Avatar: ${user.displayAvatarURL()}`);

  // Fetch user data from guild
  const guildMember = await interaction.guild?.members.fetch(user.id);

  // Build embed response
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: user.username,
      iconURL: user.displayAvatarURL(),
    })
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "User info", value: `ID: ${user.id}\nName: ${user.displayName}` },
      {
        name: "Joined Discord",
        value: hammertimeHelper.getHammertime(
          user.createdTimestamp,
          hammertimeHelper.hammertimeType.dateTime,
        ),
      },
      {
        name: "Joined Server",
        value: hammertimeHelper.getHammertime(
          guildMember?.joinedTimestamp ?? 0,
          hammertimeHelper.hammertimeType.dateTime,
        ),
      },
    );
  return interaction.reply({ embeds: [embed] });
}
