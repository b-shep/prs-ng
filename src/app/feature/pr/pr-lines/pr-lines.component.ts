import { Component, OnInit } from '@angular/core';
import { Pr } from '@model/pr.class';
import { JsonResponse } from '@model/json-response.class';
import { Prli } from '@model/prli.class';
import { PrService } from '@svc/pr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PrliService } from '@svc/prli.service';

@Component({
  selector: 'app-pr-lines',
  templateUrl: './pr-lines.component.html',
  styleUrls: ['./pr-lines.component.css']
})
export class PrLinesComponent implements OnInit {
  title: string = "purchase-request";
  title2: string = "line-items"
  pr: Pr;
  prIdStr: string;
  jr: JsonResponse;
  prlis: Prli[];
  lengthcheck:boolean = false;
  prliDeleteId:string


  constructor(
    private prSvc: PrService,
    private prliSvc: PrliService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.prIdStr = params['id'];
    });

    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.pr = this.jr.data as Pr;
      
      this.prSvc.lines(this.pr).subscribe(
        jresp => {
          this.jr = jresp;
          if (this.jr.errors == null) {
            this.prlis = this.jr.data as Prli[];
            if(this.prlis.length > 0){
              this.lengthcheck = true;
            }
          } else {
            console.log('error getting prlis for lines')
          }
      });
    });
  }

  delete(i:number){
    let prliId:string = this.prlis[i].id.toString();
    this.prliSvc.delete(prliId).subscribe(
      jresp => {
        this.jr = jresp;
        //this.router.navigate(['pr/lines/' + this.prIdStr]);
        this.ngOnInit();
      });
  }

  submit(){
    this.prSvc.submit(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        this.router.navigate(['pr/list'])
      }
    )
  }

}
