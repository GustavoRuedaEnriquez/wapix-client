import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarDisplayGuard } from '../../guards/navbar-display.guard';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  showNavbar:boolean = true;
  loggedNavbar:boolean = true;


  constructor(private router:Router, private authService:AuthService, private navbarDisplayGuard:NavbarDisplayGuard) { 
    this.navbarDisplayGuard.showNavbar.subscribe( status => {
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
