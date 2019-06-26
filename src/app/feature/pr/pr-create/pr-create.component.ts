import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Pr } from '@model/pr.class';
import { PrService } from '@svc/pr.service';
import { Router } from '@angular/router';
import { User } from '@model/user.class';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-pr-create',
  templateUrl: './pr-create.component.html',
  styleUrls: ['./pr-create.component.css']
})
export class PrCreateComponent implements OnInit {
  title:string = "pr-create";
  jr:JsonResponse;
  pr:Pr = new Pr();
  user: User;


  constructor(
    private prSvc:PrService,
    private sysSvc: SystemService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.sysSvc.data.user.loggedIn){
      this.pr.user = this.sysSvc.data.user.instance;
    } else{
      this.router.navigate['/user/login'];
    }
  }

  create(){
    this.prSvc.create(this.pr).subscribe(
      jresp =>{
        this.jr = jresp;
        if (this.jr.errors == null){
          this.router.navigate(['/pr/list']);
        } else {
          console.log("error saving pr");
        }
      }
    )
  }

}
