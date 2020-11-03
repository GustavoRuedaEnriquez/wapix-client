/* Required modules */
import { Component, OnInit } from '@angular/core';

/* Required components */
import { WapixService } from '../../globals/services/wapix.service'

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-wapix',
  templateUrl: './new-wapix.component.html',
  styleUrls: ['./new-wapix.component.scss']
})
export class NewWapixComponent implements OnInit {

  wapixNewObject:any = {}
  

  constructor(private wapixService:WapixService) {  }

  ngOnInit(): void {  }

  saveWapix(wapix:any):void {
    /*
      Obtain the token and the email from the session,
      for now, it is hardcoded.
    */
    let email:string = 'gare_98@hotmail.com';
    wapix.creator = email;

    this.wapixService.createWapix(wapix, environment.token)
      .then( data => {
        alert("Wapix creado.");
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de crear el wapix.");
      })
  }

}
