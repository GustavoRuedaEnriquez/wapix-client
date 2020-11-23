import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ThrowStmt } from '@angular/compiler';

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

  getQuestionFromWapix(wapixId:string, question:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `wapix/${wapixId}/${question}`;
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

  activateWapix(wapixId:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `wapix-activate/${wapixId}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.patch(url,{},{ headers : requestHeaders }).toPromise();
  }

  deactivateWapix(wapixId:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `wapix-deactivate/${wapixId}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.patch(url,{},{ headers : requestHeaders }).toPromise();
  }

  enterWapixCode(code:string):Promise<any> {
    let url:string = environment.apiUrl + `wapix-by-code/${code}`;
    return this.httpClient.get(url).toPromise();
  }

}
