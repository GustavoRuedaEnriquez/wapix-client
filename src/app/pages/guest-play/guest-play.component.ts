import { Component, OnInit } from '@angular/core';
import { NavbarConfigService } from '../../globals/services/navbar-config.service';

@Component({
  selector: 'app-guest-play',
  templateUrl: './guest-play.component.html',
  styleUrls: ['./guest-play.component.scss']
})
export class GuestPlayComponent implements OnInit {

  constructor(private navbarConfigService:NavbarConfigService) {
    this.navbarConfigService.hideNavbar();
  }

  ngOnInit(): void {
  }
  
}
