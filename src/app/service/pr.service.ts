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
    console.log("delete called to backend for pr id of " + pr.id);
    return this.http.delete(this.url + pr.id) as Observable<JsonResponse>;
  }

  lines(pr:Pr){
    return this.http.post(this.url + "lines-for-pr/" + pr.id, pr) as Observable<JsonResponse>;
  }

  reviewList(userId:string){
    console.log("reviewList called for user " + userId)
    return this.http.get(this.url + "list-review/" + userId) as Observable<JsonResponse>;
  }

  approve(approvePr:Pr){
    return this.http.put(this.url + "approve", approvePr) as Observable<JsonResponse>;
  }

  reject(rejectPr:Pr){
    return this.http.put(this.url + "reject", rejectPr) as Observable<JsonResponse>;
  }

  submit(submitPr:Pr){
    return this.http.put(this.url + 'submit-review', submitPr) as Observable<JsonResponse>;
  }

}
