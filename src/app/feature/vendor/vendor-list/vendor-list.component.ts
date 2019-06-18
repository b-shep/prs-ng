import { Component, OnInit } from '@angular/core';
import { Vendor } from '@model/vendor.class';
import { VendorService } from '@svc/vendor.service';
import { JsonResponse } from '@model/json-response.class';


@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  title:string = "vendor list";
  jr: JsonResponse;
  vendors: Vendor[];

  


  constructor(private vendorSvc: VendorService) { }

  ngOnInit() {
    this.vendorSvc.list().subscribe(
      jresp => {
          this.jr = jresp;
          if (this.jr.errors == null){
          this.vendors = this.jr.data as Vendor[];
          console.log(this.vendors);
          }
          else{
            console.log("error getting vendors");
            // i must decide how to handle these errors
          }
      }
    )
  }

}
