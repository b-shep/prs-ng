import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Prli } from '@model/prli.class';
import { PrliService } from '@svc/prli.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';

@Component({
  selector: 'app-prli-edit',
  templateUrl: './prli-edit.component.html',
  styleUrls: ['./prli-edit.component.css']
})
export class PrliEditComponent implements OnInit {
  title:string = "prli-edit";
  jr:JsonResponse;
  prli:Prli;
  prliIdStr:string;
  prIdStr:number;
  products: Product[];



  constructor(
    private prliSvc: PrliService,
    private productSvc: ProductService,
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
        this.prIdStr =  this.prli.purchaseRequest.id;
      });
    this.productSvc.list().subscribe(
      jresp=>{
        this.jr = jresp;
        this.products = this.jr.data as Product[];
      }
    )
  }

  edit(){
    this.prliSvc.edit(this.prli).subscribe(
      jresp => {
        this.router.navigate(['pr/lines/' + this.prIdStr]);
      });
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
