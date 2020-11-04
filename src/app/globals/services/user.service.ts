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
}
