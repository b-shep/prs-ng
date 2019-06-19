import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title:string = "product-create";
  jr: JsonResponse;
  product: Product;
  productId: string;

  constructor(
    private productSvc: ProductService, 
    private router: Router,
    private route: Route) { }

  ngOnInit() {
  }

  create(){
    this.productSvc.create(this.product)
      .subscribe( jresp =>{
        this.jr = jresp;
        if (this.jr.errors == null){
          this.product = this.jr.data as Product;
        } else {
          console.log("error saving product");
        }
      });
  }

}
