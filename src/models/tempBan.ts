import { User } from "./user";

export class TempBan {
    public id: number;
    public reason: string;
    public expiresAt: Date;
    public userId: number;
    public user: User;
}
