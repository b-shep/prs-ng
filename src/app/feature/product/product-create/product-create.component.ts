import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { Router, Route } from '@angular/router';
import { Vendor } from '@model/vendor.class';
import { VendorService } from '@svc/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title:string = "product-create";
  jr: JsonResponse;
  //intsatntiate an instance in order to provide fields for form
  product: Product = new Product();
  vendors: Vendor[];

  constructor(
    private productSvc: ProductService, 
    private router: Router,
    private vendorSvc: VendorService
    ) { }

  ngOnInit() {
    this.vendorSvc.list().subscribe(
      jresp =>{
        this.jr = jresp;
        if (this.jr.errors == null){
          this.vendors = this.jr.data as Vendor[];
        }
      }
    );
  }

  create(){
    this.productSvc.create(this.product)
      .subscribe( jresp =>{
        this.jr = jresp;
        if (this.jr.errors == null){
          this.router.navigate(['/product/list']);
        } else {
          console.log("error saving product");
        }
      });
  }

}
