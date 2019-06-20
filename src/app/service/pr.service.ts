import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '@model/json-response.class';
import { Pr } from '@model/pr.class';

@Injectable({
  providedIn: 'root'
})
export class PrService {
  url: string = "http://localhost:8080/purchase-requests/"

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse>{
    return this.http.get(this.url) as Observable<JsonResponse>;
  }
  
  create(pr:Pr){
    return this.http.post(this.url + "submit-new", pr) as Observable<JsonResponse>;
  }

  edit(pr: Pr){
    return this.http.put(this.url, pr) as Observable<JsonResponse>;
  }

  get(prId: string){
    return this.http.get(this.url + prId) as Observable<JsonResponse>;
  }

  delete(pr:Pr){
    return this.http.delete(this.url + pr.id) as Observable<JsonResponse>;
  }

  lines(pr:Pr){
    return this.http.post(this.url + "lines-for-pr" + pr.id, pr) as Observable<JsonResponse>;
  }

}
