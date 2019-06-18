import { Component, OnInit } from '@angular/core';
import { VendorService } from '@svc/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from '@model/vendor.class';
import { JsonResponse } from '@model/json-response.class';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {
  title: string = "vendor edit";
  jr: JsonResponse;
  vendor: Vendor;
  vendorIdStr: string;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //get user from database
    this.route.params.subscribe(params =>
      //id is from app routing module
      this.vendorIdStr = params['id']);
    this.vendorSvc.get(this.vendorIdStr).subscribe(jresp => {
      this.jr = jresp;
      this.vendor = this.jr.data as Vendor;
    })
  }

  edit() {
    this.vendorSvc.edit(this.vendor).subscribe(
      jresp => {
        this.jr = jresp;
        this.vendor = this.jr.data as Vendor;
        this.router.navigate(['/vendor/list']);
      });
  }
}
