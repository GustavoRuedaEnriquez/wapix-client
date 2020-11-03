/* Font-awesome Icons */
import { faSearchPlus, faSearch, faSurprise } from '@fortawesome/free-solid-svg-icons';

/* imports */
import { Component, OnInit } from '@angular/core';
import { WapixService } from 'src/app/globals/services/wapix.service';
import { environment } from '../../../environments/environment';
import { ReportService } from 'src/app/globals/services/report.service';


@Component({
  selector: 'app-report-wapix',
  templateUrl: './report-wapix.component.html',
  styleUrls: ['./report-wapix.component.scss']
})
export class ReportWapixComponent implements OnInit {

  faSearchPlus =faSearchPlus;
  faSearch =faSearch;
  faSurprise = faSurprise;

  wapixes:Array<any> = [];
  report:Array<any> = [];
  token:string = environment.token;


  constructor(private wapixService:WapixService, private reportService:ReportService) { }

  ngOnInit(): void {
    /*
      Obtain the token and the email from the session,
      for now, it is hardcoded.
    */
    let email:string = 'gare_98@hotmail.com';
    let token:string = environment.token;

    this.wapixService.getWapixFromUser(email, token)
      .then( data => {
        this.wapixes = data.wapix;
      })
      .catch( err => {
        console.error(err);
      });

  }

  getResultByWapixId(){

    let wapix:any = document.getElementById('selectWapix');
    let id = wapix.options[wapix.selectedIndex].value;
    
    this.reportService.getResultByWapixId(id, this.token)
      .then( data => {
        this.report = data.result;
        console.log('Results obtained from wapix', id);
        console.log('result: ' ,this.report);
    });
  }

}
