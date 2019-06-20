import { Component, OnInit } from '@angular/core';
import { ProductService } from '@svc/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonResponse } from '@model/json-response.class';
import { Product } from '@model/product.class';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  title:string = "product-detail";
  jr:JsonResponse;
  product:Product;
  productIdStr:string;


  constructor(
    private productSvc:ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.productIdStr = params['id']);
  
    this.productSvc.get(this.productIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.product = this.jr.data as Product;
      });
  }

  delete(){
    this.productSvc.delete(this.productIdStr).subscribe(
      jresp => {
        this.jr = jresp;
        this.router.navigate(['/product/list'])
      }
    )
  }

  
}
