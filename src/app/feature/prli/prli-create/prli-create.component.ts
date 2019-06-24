import { Component, OnInit } from '@angular/core';
import { JsonResponse } from '@model/json-response.class';
import { Pr } from '@model/pr.class';

@Component({
  selector: 'app-prli-create',
  templateUrl: './prli-create.component.html',
  styleUrls: ['./prli-create.component.css']
})
export class PrliCreateComponent implements OnInit {
  title: string = "prli-create"
  jr:JsonResponse;
  pr:Pr;
  

  constructor() { }

  ngOnInit() {
  }

}
