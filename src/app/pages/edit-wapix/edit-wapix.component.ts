import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { WapixService } from '../../globals/services/wapix.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-wapix',
  templateUrl: './edit-wapix.component.html',
  styleUrls: ['./edit-wapix.component.scss']
})
export class EditWapixComponent implements OnInit {
  isLoading:boolean = true;
  wapixId:string;
  wapixObject:any = {}

  constructor(private wapixService:WapixService, private activatedRoute:ActivatedRoute) {
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
        this.isLoading = false;
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de cargar el wapix.");
      })
  }

  updateWapix(wapix:any):void {
    this.wapixService.updateWapix(this.wapixId, wapix, environment.token)
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
