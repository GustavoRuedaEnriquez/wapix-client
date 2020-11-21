import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarConfigService {

  display:BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() { }

  hideNavbar():void {
    this.display.next(false);
  }

  showNavbar():void {
    this.display.next(true);
  }

}
