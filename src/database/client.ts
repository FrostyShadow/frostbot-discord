import { PrismaClient } from "@prisma/client";
import { Logger } from "pino";

export const client = new PrismaClient({
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
  errorFormat: "pretty",
});

export function init(logger: Logger) {
  client.$on("warn", (e) => {
    logger.warn(e);
  });

  client.$on("info", (e) => {
    logger.info(e);
  });

  client.$on("error", (e) => {
    logger.error(e);
  });
}
