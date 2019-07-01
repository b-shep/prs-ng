import { Component, OnInit } from '@angular/core';
import { UserService } from '@svc/user.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { JsonResponse } from '@model/json-response.class';
import { User } from '@model/user.class';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  message:string ="";
  jr: JsonResponse;
  user: User = new User();
  
  constructor(
    private userSvc: UserService,
    private sysSvc: SystemService,
    private router: Router,
    private route:ActivatedRoute
  ) { }


  ngOnInit() {
    ////testing
    this.user.userName = "bshep";
    this.user.password = "password"
  }

  login(){
    this.userSvc.login(this.user).subscribe(
      jresp => {
        this.jr = jresp;
        if(this.jr.errors == null){
          this.user = this.jr.data as User;
          this.sysSvc.data.user.instance = this.user;
          this.sysSvc.data.user.loggedIn = true;
          this.router.navigateByUrl('/home');
        } else{
          this.message = "Invalid UserName/Password Combination. Please retry.";
        }
      }
    )
  }

}
