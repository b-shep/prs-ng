export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    reviewer: boolean;
    admin: boolean;

    constructor(id:number=0, userName:string="", password:string="", firstName:string="", 
                lastName:string="", phoneNumber: string ="", email: string = "",
                reviewer:boolean=false, admin:boolean = false){

     }


     about(): string{
         return "User: id = " + this.id + ", userName = " + this.userName + ", first name = " + this.firstName + ", last name = "
         + this.lastName + ", phone number = " + this.phoneNumber + ", email = " + this.email + ", isReviewer? " 
         + this.reviewer + ", isAdmin?"  + this.admin;
     }
}
