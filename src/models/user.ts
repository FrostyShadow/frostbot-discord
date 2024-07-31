import { Warning } from "./warning";
import { TempBan } from "./tempBan";
import { Level } from "./level";
import { Birthday } from "./birthday";
import { Prisma } from "@prisma/client";
import { helpers } from "../helpers";

export class User {
    public id: number;
    public userId: string;
    public guildId: string;
    public joinDate: Date;
    public levelId?: number;
    public birthdayId?: number;
    public warnings: Warning[] = [];
    public tempBans: TempBan[] = [];
    public level?: Level;
    public birthday?: Birthday;

    static toInputEntity(user: User) {
        const entity: Prisma.UserCreateInput = {
            userId: user.userId,
            guildId: user.guildId,
            joinDate: user.joinDate,
            Level: {
                create: {
                    currentLevel: 0,
                    nextLevelUpAt: helpers.dateHelper.addMonths(user.joinDate, 6)
                }
            }
        };

        return entity;
    }
}
