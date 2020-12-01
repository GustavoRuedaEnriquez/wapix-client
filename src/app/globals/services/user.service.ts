import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  createUser(user:any):Promise<any> {
    let url:string = environment.apiUrl + `user`;

    return this.httpClient.post(url,user).toPromise();
  }

  loginUser(user:any):Promise<any> {
    let url:string = environment.apiUrl + `login`;

    return this.httpClient.post(url,user).toPromise();
  }
  
  googleLogin(user:any):Promise<any> {
    let url:string = environment.apiUrl + `googleLogin`;

    return this.httpClient.post(url,user).toPromise();
  }

  getUser(email:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `user/${email}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.get(url,{ headers : requestHeaders}).toPromise();
  }

  updatetUser(user:any, email:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `user/${email}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.patch(url, user, { headers : requestHeaders}).toPromise();
  }

  photoUpload(data:any, token:string):Promise<any> {
    let url:string = environment.apiUrl + `upload`;

    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.post(url, data, { headers : requestHeaders}).toPromise();
    //return this.httpClient.post(url, data).toPromise();
  }

}
