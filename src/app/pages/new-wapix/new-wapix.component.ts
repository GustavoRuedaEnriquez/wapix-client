/* Required modules */
import { Component, OnInit } from '@angular/core';

/* Required components */
import { WapixService } from '../../globals/services/wapix.service'
import { AuthService } from 'src/app/globals/services/auth.service';

@Component({
  selector: 'app-new-wapix',
  templateUrl: './new-wapix.component.html',
  styleUrls: ['./new-wapix.component.scss']
})
export class NewWapixComponent implements OnInit {

  wapixNewObject:any = {}

  constructor(private wapixService:WapixService, private authService: AuthService) {  }

  ngOnInit(): void {  }

  saveWapix(wapix:any):void {
    /*
      Obtain the token and the email from the session,
      for now, it is hardcoded.
    */
   let email:string = this.authService.getEmail(); 
   let token:string = this.authService.getToken();
    wapix.creator = email;

    this.wapixService.createWapix(wapix,token)
      .then( data => {
        alert("Wapix creado.");
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de crear el wapix.");
      })
  }

}
