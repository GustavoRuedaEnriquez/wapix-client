import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../../globals/components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-view-wapix',
  templateUrl: './view-wapix.component.html',
  styleUrls: ['./view-wapix.component.scss']
})
export class ViewWapixComponent implements OnInit {

  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
