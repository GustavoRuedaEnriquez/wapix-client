import { Component, OnInit } from '@angular/core';
import { NavbarConfigService } from '../../globals/services/navbar-config.service';

@Component({
  selector: 'app-guest-question',
  templateUrl: './guest-question.component.html',
  styleUrls: ['./guest-question.component.scss']
})
export class GuestQuestionComponent implements OnInit {

  constructor(private navbarConfigService:NavbarConfigService,) {
    this.navbarConfigService.hideNavbar();
  }

  ngOnInit(): void {
  }

}
