import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  logOff() {
    this.authService.clear();
    this.router.navigate(['../login']);
  }

}
