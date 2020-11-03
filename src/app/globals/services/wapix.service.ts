import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WapixService {

  constructor(private httpClient:HttpClient) { }

  createWapix(wapix:any, token:string):Promise<any> {
    let url:string = environment.apiUrl + "wapix";
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.post(url,wapix,{ headers : requestHeaders }).toPromise();
  }

  getWapixFromId(id:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `wapix/${id}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.get(url,{ headers : requestHeaders }).toPromise();
  }

  getWapixFromUser(email:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `wapix/creator/${email}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.get(url,{ headers : requestHeaders }).toPromise();
  }

  updateWapix(id:string, wapix:any, token:string):Promise<any> {
    let url:string = environment.apiUrl + `wapix/${id}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.patch(url,wapix,{ headers : requestHeaders }).toPromise();
  }

}
