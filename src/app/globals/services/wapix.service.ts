import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WapixService {

  constructor(private httpClient:HttpClient) { }

  getWapixFromId(id:string, token:string):Promise<any> {
    let url:string = `http://127.0.0.1:3003/api/wapix/${id}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.get(url,{ headers : requestHeaders}).toPromise();
  }

  getWapixFromUser(email:string, token:string):Promise<any> {
    let url:string = `http://127.0.0.1:3003/api/wapix/creator/${email}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.get(url,{ headers : requestHeaders}).toPromise();
  }

  


}
