/* Font Awesome icons */
import { faGamepad, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { WapixService } from '../../globals/services/wapix.service';

import { AuthService } from 'src/app/globals/services/auth.service';


@Component({
  selector: 'app-play-wapix',
  templateUrl: './play-wapix.component.html',
  styleUrls: ['./play-wapix.component.scss']
})
export class PlayWapixComponent implements OnInit {

  faGamepad = faGamepad;
  faDoorOpen = faDoorOpen;

  isLoading:boolean = true;
  wapixId:string;
  wapixObject:any = {}
  wapixCode:string;
  

  constructor(private activatedRoute:ActivatedRoute, private wapixService:WapixService, private authService:AuthService) {
    this.activatedRoute.params.subscribe( params => {
      this.wapixId = params.id;
    })
   }

  ngOnInit(): void {
    /* Obtain the token and from the session */
    let token:string = this.authService.getToken();
    this.wapixService.getWapixFromId(this.wapixId, token)
      .then( data => {
        this.wapixObject = data.wapix[0];
        this.wapixCode = this.wapixObject.code;
        this.isLoading = false;
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de cargar el wapix.");
      }
    );
  }

  exitClick():void {
    console.log("me salí");
  }

}
