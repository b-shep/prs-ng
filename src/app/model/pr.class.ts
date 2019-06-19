import { User } from './user.class';

export class Pr{
    id: number; 
    user: User;
    description: string;
    justification: string;
    dateNeeded: Date;
    deliveryMode: string;
    status: string;
    total: number;
    submittedDate: Date;
    reasonForRejection: string;

    constructor(
        id: number = 0, 
        user: User = new User(),
        description: string = "",
        justification: string = "",
        dateNeeded: Date = new Date("0000-00-00"),
        deliveryMode: string = "",
        status: string = "",
        total: number = 0,
        submittedDate: Date = new Date("0000-00-00"),
        reasonForRejection: string = ""){}
    
    about(): string{
        return "Purchase Request: id = " + this.id + ", user = " + this.user.userName + ", description = " + this.description + ", justification = " + this.justification +
        ", dateNeeded = " + this.dateNeeded + ", deliveryMode = " + this.deliveryMode + ", status = " + this.status + ", total = " + this.total + ", submittedDate = "
        + this.submittedDate + ", reasonForRejection = " + this.reasonForRejection;
    }
}