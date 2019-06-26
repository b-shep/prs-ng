import { Component, OnInit } from '@angular/core';
import { PrService } from '@svc/pr.service';
import { SystemService } from '@svc/system.service';
import { Router } from '@angular/router';
import { User } from '@model/user.class';
import { Pr } from '@model/pr.class';
import { JsonResponse } from '@model/json-response.class';

@Component({
  selector: 'app-pr-review',
  templateUrl: './pr-review.component.html',
  styleUrls: ['./pr-review.component.css']
})
export class PrReviewComponent implements OnInit {
  user:User;
  prs:Pr[];
  jr: JsonResponse;
  revCheck: boolean;
  reason:string;
  
  constructor(
    private prSvc:PrService,
    private sysSvc: SystemService,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.sysSvc.data.user.loggedIn){
      this.user = this.sysSvc.data.user.instance;
      if (this.user.reviewer == false){
        this.revCheck = false;
      } else{
        this.revCheck = true;
        this.prSvc.reviewList(this.user.id.toString()).subscribe(
          jresp =>{
            this.jr = jresp;
              this.prs = this.jr.data as Pr[];
          });
      }
    } else{
      this.router.navigate['/user/login'];
    }
  }
  notlogged(){
    this.router.navigate['/user/login'];
  }

  approve(i:number){
    let approvePr:Pr = this.prs[i];
    this.prSvc.approve(approvePr).subscribe(
      jresp =>{
          this.jr = jresp;
          this.ngOnInit();
      });
  }


  reasonReject(i:number){
    this.ngOnInit();
    let rejectPr:Pr = this.prs[i];
    rejectPr.reasonForRejection = "change";
    this.prSvc.edit(rejectPr).subscribe(
      jresp =>{
      }
    )


  }
  reject(i:number){
    let rejectPr:Pr = this.prs[i];
    rejectPr.reasonForRejection = this.reason;
    this.prSvc.reject(rejectPr).subscribe(
      jresp =>{
        this.jr =jresp;
        this.ngOnInit();
      });
  }

}
