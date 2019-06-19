import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:string = "product list";
  jr:JsonResponse;
  products: Product[];

  sortCriteria: string = "id";
  sortOrder: string = "asc";

  constructor(private productSvc:ProductService) { }

  ngOnInit() {
    this.productSvc.list().subscribe(
      jresp =>{
        this.jr = jresp;
        if (this.jr.errors == null){
          this.products = this.jr.data as Product[];
        } else{
          console.log("error getting products");
        }
      });
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
