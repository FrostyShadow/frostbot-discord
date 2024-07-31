import { PrismaClient, Prisma } from "@prisma/client";
import { User } from "../../models/user";

export async function execute(data: User, client: PrismaClient) {
    const user: Prisma.UserCreateInput = User.toInputEntity(data);

    await client.user.create({ data: user });
}