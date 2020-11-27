/* Font-awesome Icons */
import { faSearchPlus, faSearch, faSurprise } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { WapixService } from 'src/app/globals/services/wapix.service';
import { ReportService } from 'src/app/globals/services/report.service';
import { AuthService } from 'src/app/globals/services/auth.service';
import { Title } from '@angular/platform-browser';


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


  constructor(
    private wapixService:WapixService,
    private reportService:ReportService,
    private authService:AuthService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Wapix | Reportes');
    /* Obtain the token and the email from the session */
   let email:string = this.authService.getEmail();
   let token:string = this.authService.getToken();

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
    let token:string = this.authService.getToken();

    this.reportService.getResultByWapixId(id, token)
      .then( data => {
        this.report = data.result;
        console.log('Results obtained from wapix', id);
        console.log('result: ' ,this.report);
    });
  }

}
