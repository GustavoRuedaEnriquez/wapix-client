import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient:HttpClient) { }

  getResultByWapixId(id:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `result/wapixId/${id}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.get(url,{ headers : requestHeaders }).toPromise();
  }
}
