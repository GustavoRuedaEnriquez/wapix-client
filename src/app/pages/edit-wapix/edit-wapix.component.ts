import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { WapixService } from '../../globals/services/wapix.service';

import { AuthService } from 'src/app/globals/services/auth.service';

@Component({
  selector: 'app-edit-wapix',
  templateUrl: './edit-wapix.component.html',
  styleUrls: ['./edit-wapix.component.scss']
})
export class EditWapixComponent implements OnInit {
  isLoading:boolean = true;
  wapixId:string;
  wapixObject:any = {}

  constructor(private wapixService:WapixService, private activatedRoute:ActivatedRoute, private authService:AuthService) {
    this.activatedRoute.params.subscribe( params => {
      this.wapixId = params.id;
    })
  }

  ngOnInit(): void {
    /* Obtain the token and from the session. */
    let token:string = this.authService.getToken();

    this.wapixService.getWapixFromId(this.wapixId, token)
      .then( data => {
        this.wapixObject = data.wapix[0];
        this.isLoading = false;
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de cargar el wapix.");
      })
  }

  updateWapix(wapix:any):void {
    /* Obtain the token and from the session. */
    let token:string = this.authService.getToken();
    this.wapixService.updateWapix(this.wapixId, wapix, token)
      .then( data => {
        alert("Wapix modificado.");
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de modificar el wapix.");
      }
    );
  }

  exitClick():void {
    console.log("Me salí, debo de actualizar el availability");
  }
}
