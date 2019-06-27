import { Component, OnInit } from '@angular/core';
import { PrService } from '@svc/pr.service';
import { SystemService } from '@svc/system.service';
import { Router } from '@angular/router';
import { User } from '@model/user.class';
import { Pr } from '@model/pr.class';
import { JsonResponse } from '@model/json-response.class';
import { Prli } from '@model/prli.class';

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
  status:boolean = true;
  rejectPr:Pr[];
  prlis:Prli[];
  rejectId:number;
  linesCheck:boolean = true;
  
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
    this.rejectId = i;
    let rejectPr:Pr = this.prs[i];
    this.rejectPr = [rejectPr];
    this.prSvc.lines(rejectPr).subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null) {
          this.prlis = this.jr.data as Prli[];
          console.log("prlis are " + this.prlis)
        } else {
          console.log('error getting prlis for lines')
        }
    });
    this.status = !this.status;
  }


  reject(i:number){
    this.linesCheck = false;
    let rejectPr:Pr = this.prs[i];
    rejectPr.reasonForRejection = this.reason
    this.prSvc.reject(rejectPr).subscribe(
      jresp =>{
        this.jr =jresp;
        this.ngOnInit();
      });
  }

  lines(i:number){
    this.linesCheck=true;
    this.reasonReject(i);
  }

  cancel(){
    this.status = !this.status;
  }

}
