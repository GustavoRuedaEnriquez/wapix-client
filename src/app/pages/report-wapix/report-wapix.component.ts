/* Font-awesome Icons */
import { faSearchPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-report-wapix',
  templateUrl: './report-wapix.component.html',
  styleUrls: ['./report-wapix.component.scss']
})
export class ReportWapixComponent implements OnInit {

  faSearchPlus =faSearchPlus;
  faSearch =faSearch;


  constructor() { }

  ngOnInit(): void {
  }

}
