import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NavbarDisplayGuard implements CanActivate {

  showNavbar:BehaviorSubject<boolean> = new BehaviorSubject(true);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(route.data.display != undefined) {
      this.showNavbar.next(route.data.display);
    } else {
      this.showNavbar.next(true);
    }
      
    return true;
  }
  
}
