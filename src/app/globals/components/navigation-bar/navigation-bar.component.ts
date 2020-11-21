import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarConfigService } from '../../services/navbar-config.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  showNavbar:boolean = true;
  loggedNavbar:boolean = true;


  constructor(private router:Router, private authService:AuthService, private navbarConfigService:NavbarConfigService) { 
    this.navbarConfigService.display.subscribe( status => {
      this.showNavbar = status;
    });

    this.authService.loginStatus.subscribe( status => {
      this.loggedNavbar = status;
    })
  }

  ngOnInit(): void {
  }

  logOff() {
    this.authService.clear();
    this.router.navigate(['../login']);
  }

}
