import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Pr } from '@model/pr.class';
import { PrService } from '@svc/pr.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {
  title:string = "purchase request list";
  jr:JsonResponse;
  prs:Pr[];
  prId: string;

  constructor(
    private prSvc:PrService, 
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.prSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        if (this.jr.errors == null){
          this.prs = this.jr.data as Pr[];
        } else{
          console.log("error getting pr list")
        }
      }
    )
  }

}
