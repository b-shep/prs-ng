import { Component, OnInit } from '@angular/core';
import { Pr } from '@model/pr.class';
import { JsonResponse } from '@model/json-response.class';
import { Prli } from '@model/prli.class';
import { PrService } from '@svc/pr.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pr-lines',
  templateUrl: './pr-lines.component.html',
  styleUrls: ['./pr-lines.component.css']
})
export class PrLinesComponent implements OnInit {
  title: string = "pr-lines";
  pr: Pr;
  prIdStr: string;
  jr: JsonResponse;
  prlis: Prli[];
  lengthcheck:boolean = false;


  constructor(
    private prSvc: PrService,
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

}
