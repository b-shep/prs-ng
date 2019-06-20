import { Component, OnInit } from '@angular/core';
import { PrService } from '@svc/pr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pr } from '@model/pr.class';
import { JsonResponse } from '@model/json-response.class';

@Component({
  selector: 'app-pr-detail',
  templateUrl: './pr-detail.component.html',
  styleUrls: ['./pr-detail.component.css']
})
export class PrDetailComponent implements OnInit {
  title:string = "pr-detail";
  jr: JsonResponse;
  pr:Pr;
  prIdStr: string;

  constructor(
    private prSvc:PrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.prIdStr = params['id']);
  
    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.pr = this.jr.data as Pr;
      });
  }

  delete(){
    this.prSvc.delete(this.pr).subscribe(
      jresp=>{
        this.jr = jresp;
        this.router.navigate(['pr/list'])
      }
    )

  }

}
