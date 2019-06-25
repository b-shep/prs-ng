import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Pr } from '@model/pr.class';
import { PrliService } from '@svc/prli.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PrService } from '@svc/pr.service';
import { ProductService } from '@svc/product.service';
import { Prli } from '@model/prli.class';
import { Product } from '@model/product.class';

@Component({
  selector: 'app-prli-create',
  templateUrl: './prli-create.component.html',
  styleUrls: ['./prli-create.component.css']
})
export class PrliCreateComponent implements OnInit {
  title: string = "prli-create"
  jr:JsonResponse;
  prli:Prli = new Prli();
  prIdStr:string;
  products: Product[];
  pr:Pr;


  constructor(
    private prliSvc: PrliService,
    private prSvc: PrService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params =>{
        this.prIdStr = params['id'];
        this.prSvc.get(this.prIdStr).subscribe( 
          jresp =>{
            this.jr = jresp;
            this.pr = this.jr.data as Pr;
            this.prli.purchaseRequest = this.pr;
          }
        )
      });
    this.productSvc.list().subscribe(
      jresp => {
        this.jr = jresp;
        this.products = this.jr.data as Product[];
      });

  }

  create(){
    this.prliSvc.create(this.prli).subscribe(
      jresp =>{
        this.jr = jresp;
        this.router.navigate(['pr/lines/' + this.prli.purchaseRequest.id])

      });
  }

}
