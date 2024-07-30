import { User } from "./user";

export class Birthday {
    public id: number;
    public day: number;
    public month: number;
    public year?: number;
    public userId: number;
    public user: User;
}
