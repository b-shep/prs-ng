import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { User } from '@model/user.class';
import { UserService } from '@svc/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title: string = "user edit";
  jr: JsonResponse;
  user: User;
  userIdStr: string;


  constructor(
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  edit() {
    this.userSvc.edit(this.user).subscribe(
      jresp => {
        this.jr = jresp;
        this.user = this.jr.data as User;
        this.router.navigate(['/user/list']);
      });
  }

  ngOnInit() {
    //get user from database
    this.route.params.subscribe(params =>
      //id is from app routing module
      this.userIdStr = params['id']);
    this.userSvc.get(this.userIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.user = this.jr.data as User;
    })
  }

}
