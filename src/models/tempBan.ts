import { User } from "./user";

export class TempBan {
    public reason: string;
    public expiresAt: Date;
    public userId: number;
    public user: User;
}
