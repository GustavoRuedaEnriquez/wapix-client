/* Font-awesome Icons */
import { faSearchPlus, faSearch, faSurprise, faFileExcel } from '@fortawesome/free-solid-svg-icons';

/* imports */
import { Component, OnInit } from '@angular/core';
import { WapixService } from 'src/app/globals/services/wapix.service';
import { ReportService } from 'src/app/globals/services/report.service';
import { AuthService } from 'src/app/globals/services/auth.service';
import { XslxExportService } from 'src/app/globals/services/xslx-export.service';

@Component({
  selector: 'app-report-wapix',
  templateUrl: './report-wapix.component.html',
  styleUrls: ['./report-wapix.component.scss']
})
export class ReportWapixComponent implements OnInit {

  faSearchPlus = faSearchPlus;
  faSearch = faSearch;
  faSurprise = faSurprise;
  faFileExcel = faFileExcel;
  btn: Boolean = true;
  isLoading: Boolean = true;

  wapixes: Array<any> = [];
  report: Array<any> = [];


  constructor(private wapixService: WapixService, private reportService: ReportService, private authService: AuthService, private xslxExportService: XslxExportService) { }

  ngOnInit(): void {
    /* Obtain the token and the email from the session */
    let email: string = this.authService.getEmail();
    let token: string = this.authService.getToken();

    this.wapixService.getWapixFromUser(email, token)
      .then(data => {
        this.wapixes = data.wapix;
        this.isLoading = false;
      })
      .catch(err => {
        console.error(err);
      });

  }

  getResultByWapixId() {

    this.btn = false;

    let wapix: any = document.getElementById('selectWapix');
    let id = wapix.options[wapix.selectedIndex].value;
    let name: string = wapix.options[wapix.selectedIndex].text;
    let token: string = this.authService.getToken();

    this.reportService.getResultByWapixId(id, token)
      .then(data => {
        this.report = data.result;
        console.log('Results obtained from wapix ' + name + ', id: ' + id);
      });
  }

  exportResults(result:any) {
    console.log('Descargando... ', result);
  }

}
