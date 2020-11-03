import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WapixService {

  constructor(private httpClient:HttpClient) { }

  createUser(user:any):Promise<any> {
    let url:string = environment.apiUrl + `user`;

    return this.httpClient.post(url,user).toPromise();
  }

  loginUser(user:any):Promise<any> {
    let url:string = environment.apiUrl + `login`;

    return this.httpClient.post(url,user).toPromise();
  }

  getWapixFromId(id:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `wapix/${id}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.get(url,{ headers : requestHeaders}).toPromise();
  }

  getWapixFromUser(email:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `wapix/creator/${email}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.get(url,{ headers : requestHeaders}).toPromise();
  }

  


}
