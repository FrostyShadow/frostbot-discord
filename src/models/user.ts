import { Warning } from "./warning";
import { TempBan } from "./tempBan";
import { Level } from "./level";
import { Birthday } from "./birthday";

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
}
