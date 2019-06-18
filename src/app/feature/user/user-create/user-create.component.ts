import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { User } from '@model/user.class';
import { UserService } from '@svc/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  title: string = "User-Create";
  jr: JsonResponse;
  user: User = new User();
  
  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit() {
  }

  create(){
    this.userSvc.create(this.user)
      .subscribe(jresp => {
        //assuming a good call
        this.jr = jresp;
        this.router.navigate(['/user/list']);
      });
  }

}
