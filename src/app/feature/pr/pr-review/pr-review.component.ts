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
  prs:Pr[]=[];
  jr: JsonResponse;
  revCheck: boolean;
  reason:string;
  status:boolean = true;
  rejectPrs:Pr[];
  rejectPr:Pr;
  prlis:Prli[];
  rejectId:number;
  linesCheckforApprove:boolean = false;
  
  constructor(
    private prSvc:PrService,
    private sysSvc: SystemService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.sysSvc.data.user.instance;
    if(this.user == null){
      this.router.navigateByUrl('user/login');
    }
    this.prSvc.reviewList(this.user.id.toString()).subscribe(
      jresp =>{
        this.jr = jresp;
          this.prs = this.jr.data as Pr[];
          console.log("prs length is " + this.prs.length);
      });
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
    this.linesCheckforApprove = false;
    this.reasonAction(i);
  }
  reasonAction(i:number){
    this.rejectId = i;
    this.rejectPr = this.prs[i];
    this.rejectPrs = [this.rejectPr];
    this.prSvc.lines(this.rejectPr).subscribe(
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


  reject(){
    this.rejectPr.reasonForRejection = this.reason
    this.prSvc.reject(this.rejectPr).subscribe(
      jresp =>{
        this.jr =jresp;
        this.status=!this.status;
        this.ngOnInit();
      });
  }

  lines(i:number){
    this.linesCheckforApprove=true;
    console.log("lines check is " + this.linesCheckforApprove)
    this.reasonAction(i);
  }

  cancel(){
    this.status = !this.status;
  }

}
