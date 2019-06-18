import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '@model/json-response.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:8080/products/";

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse>{
    return this.http.get(this.url) as Observable<JsonResponse>;
  };


}
