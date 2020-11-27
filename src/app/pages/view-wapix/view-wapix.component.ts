import { faPlayCircle, faEdit, faTrashAlt, faPlusCircle, faSurprise } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { WapixService } from '../../globals/services/wapix.service';
import { AuthService } from 'src/app/globals/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NavbarConfigService } from '../../globals/services/navbar-config.service';

@Component({
  selector: 'app-view-wapix',
  templateUrl: './view-wapix.component.html',
  styleUrls: ['./view-wapix.component.scss']
})
export class ViewWapixComponent implements OnInit {

  wapixes:Array<any> = [];
  isLoading:Boolean = true;
  hasError:Boolean = false;
  faPlusCircle = faPlusCircle;
  faPlayCircle = faPlayCircle;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSurprise = faSurprise;

  constructor(
    private wapixService:WapixService,
    private authService:AuthService,
    private router:Router,
    private titleService: Title,
    private navbarConfigService:NavbarConfigService)
  {
    this.navbarConfigService.showNavbar();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Wapix | Mis Wapix');
    /* Obtain the token and the email from the session */
    let email:string = this.authService.getEmail();
    let token:string = this.authService.getToken();

    this.wapixService.getWapixFromUser(email, token)
      .then( data => {
        this.isLoading = false;
        this.wapixes = data.wapix;
      })
      .catch( err => {
        this.hasError = true;
        console.error(err);
      });

  }

  deleteWapix(wapixId:string):void {
    /* Obtain the token and from the session. */
    let token:string = this.authService.getToken();
    this.wapixService.deleteWapixFromId(wapixId, token)
      .then( data => {
        this.ngOnInit();
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error al eliminar el wapix.");
      })
  }

}
