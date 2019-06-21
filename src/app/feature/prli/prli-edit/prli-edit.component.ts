import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Prli } from '@model/prli.class';
import { PrliService } from '@svc/prli.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prli-edit',
  templateUrl: './prli-edit.component.html',
  styleUrls: ['./prli-edit.component.css']
})
export class PrliEditComponent implements OnInit {
  title:string = "prli-create";
  jr:JsonResponse;
  prli:Prli;
  prliIdStr:string;
  prIdStr:number;


  constructor(
    private prliSvc: PrliService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.prliIdStr = params['id'];
    });

    this.prliSvc.get(this.prliIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        this.prli = this.jr.data as Prli;
        this.prIdStr = this.prli.pr.id;
      });
  }

  edit(){
    this.prliSvc.edit(this.prli).subscribe(
      jresp =>{
        this.router.navigate(['pr/lines/' + this.prIdStr]);
      });
  }
}
