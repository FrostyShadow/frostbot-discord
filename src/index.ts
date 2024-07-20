import { Client } from "discord.js";
import { config } from "./config";

const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", () => {
    console.log(`Discord bot is ready! Logged in as: ${client.user?.username}`)
})

client.login(config.DISCORD_TOKEN);