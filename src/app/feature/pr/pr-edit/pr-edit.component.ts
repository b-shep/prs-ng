import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Pr } from '@model/pr.class';
import { PrService } from '@svc/pr.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pr-edit',
  templateUrl: './pr-edit.component.html',
  styleUrls: ['./pr-edit.component.css']
})
export class PrEditComponent implements OnInit {
  title: string = "pr-edit"
  jr:JsonResponse;
  pr:Pr;
  prIdStr: string;


  constructor(
    private prSvc: PrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params =>{
        this.prIdStr = params['id'];
      });

    this.prSvc.get(this.prIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.pr = this.jr.data as Pr;
    });
  }

  edit(){
    this.prSvc.edit(this.pr).subscribe(
      jresp => {
        this.jr = jresp;
        this.router.navigate(['/pr/list']);
      });
  }

  delete(){
    this.prSvc.delete(this.pr).subscribe(
      jresp =>{
        this.jr =jresp;
        this.router.navigate(['pr/list']);
      })
  }

}
