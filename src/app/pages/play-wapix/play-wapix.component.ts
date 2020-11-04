/* Font Awesome icons */
import { faGamepad, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { WapixService } from '../../globals/services/wapix.service';

import { environment } from '../../../environments/environment';


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
  

  constructor(private activatedRoute:ActivatedRoute, private wapixService:WapixService) {
    this.activatedRoute.params.subscribe( params => {
      this.wapixId = params.id;
    })
   }

  ngOnInit(): void {
    /*
      Obtain the token and from the session,
      for now, it is hardcoded.
    */
    this.wapixService.getWapixFromId(this.wapixId, environment.token)
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
