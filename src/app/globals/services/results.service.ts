import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private httpClient:HttpClient) { }

  createResult(wapixResult:any, token:string) {
    let url:string = environment.apiUrl + "result";
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.post(url,wapixResult,{ headers : requestHeaders }).toPromise();
  }

}
