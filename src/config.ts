import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, TEST_GUILD_ID, ENVIRONMENT } =
  process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !TEST_GUILD_ID || !ENVIRONMENT) {
  throw new Error("Missing environment variables!");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  TEST_GUILD_ID,
  ENVIRONMENT,
};
