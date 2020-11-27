/* Font-awesome Icons */
import { faSearchPlus, faSearch, faSurprise, faFileExcel } from '@fortawesome/free-solid-svg-icons';

/* imports */
import { Component, OnInit } from '@angular/core';
import { WapixService } from 'src/app/globals/services/wapix.service';
import { ReportService } from 'src/app/globals/services/report.service';
import { AuthService } from 'src/app/globals/services/auth.service';
import { Title } from '@angular/platform-browser';
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


  constructor(
    private wapixService:WapixService,
    private reportService:ReportService,
    private authService:AuthService,
    private titleService: Title,
    private xslxExportService: XslxExportService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Wapix | Reportes');
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

  /* After a wapix it´s chosen it shows the diferent results of the wapix */
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

  /* When push the btn send the result to the xlsx export service */
  exportResults(result:any) {
    this.xslxExportService.xlsxExportToPC(result);
  }

}
