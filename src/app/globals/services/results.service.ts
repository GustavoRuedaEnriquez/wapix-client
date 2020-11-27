import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private httpClient:HttpClient) { }

  createResult(wapixResult:any, token:string):Promise<any> {
    let url:string = environment.apiUrl + "result";
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.post(url,wapixResult,{ headers : requestHeaders }).toPromise();
  }

  addQuestionToResult(question:any, resultId:any, token:string):Promise<any> {
    let url:string = environment.apiUrl + `result-add-question/${resultId}`;
    console.log(url);
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.patch(url,question,{ headers : requestHeaders }).toPromise();
  }

  addSubmissionToQuestionOnResult(submission:any, resultId:any, token:string):Promise<any> {
    let url:string = environment.apiUrl + `result-add-submission/${resultId}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.patch(url,submission,{ headers : requestHeaders }).toPromise();
  }

  getResultByWapixId(id:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `result/wapixId/${id}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.get(url,{ headers : requestHeaders }).toPromise();
  }

  deleteResultFromId(id:string, token:string):Promise<any> {
    let url:string = environment.apiUrl + `result/${id}`;
    let requestHeaders = {
      'Authorization' : `${token}`
    }
    return this.httpClient.delete(url,{ headers : requestHeaders }).toPromise();
  }

}
