import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '@svc/vendor.service';
import { Vendor } from '@model/vendor.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = "product-edit"
  jr: JsonResponse;
  productIdStr: string;
  product: Product;
  vendors: Vendor[];

  sortCriteria: string = "id";
  sortOrder: string = "asc"; // or anything else for desc

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private vendorSvc: VendorService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      //id is from app routing module
      this.productIdStr = params['id']);
    this.productSvc.get(this.productIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.product = this.jr.data as Product;
    });

    this.vendorSvc.list().subscribe(
      jresp =>{
        this.jr = jresp;
        if (this.jr.errors == null){
          this.vendors = this.jr.data as Vendor[];
        } else{
          console.log("error getting vendors")
        }
      });
  }

  edit(){
    this.productSvc.edit(this.product).subscribe(
      jresp => {
        this.jr = jresp;
        this.router.navigate(['/product/list']);
      });
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

  sortBy(column: string): void {
    if(this.sortCriteria === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCriteria = column;
      this.sortOrder = 'asc';
    }
  }

}
