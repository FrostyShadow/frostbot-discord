import { PrismaClient, Prisma } from "@prisma/client";
import { User } from "../../models/user";

export async function main(data: User, client: PrismaClient) {
    const user: Prisma.UserCreateInput = {
        userId: data.userId,
        guildId: data.guildId,
        joinDate: data.joinDate
    };

    await client.user.create({ data: user });
}