import { User } from "./user";
 
export class Level {
    public id: number;
    public currentLevel: number;
    public nextLevelUpAt?: Date;
    public userId: number;
    public user: User;
}
