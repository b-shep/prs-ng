import { Component, OnInit } from '@angular/core';
import { ProductService } from '@svc/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private productSvc:ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  
}
