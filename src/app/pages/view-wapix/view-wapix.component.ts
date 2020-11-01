import { faPlayCircle, faEdit, faTrashAlt, faPlusCircle, faSurprise } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';

import { NavigationBarComponent } from '../../globals/components/navigation-bar/navigation-bar.component';

import { WapixService } from '../../globals/services/wapix.service'

@Component({
  selector: 'app-view-wapix',
  templateUrl: './view-wapix.component.html',
  styleUrls: ['./view-wapix.component.scss']
})
export class ViewWapixComponent implements OnInit {

  wapixes:Array<any> = [];
  faPlusCircle = faPlusCircle;
  faPlayCircle = faPlayCircle;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSurprise = faSurprise;

  constructor(private wapixService:WapixService) { }

  ngOnInit(): void {
    /*
      Obtain the token and the email from the session,
      for now, it is hardcoded.
    */
    let email:string = 'gare_98@hotmail.com';
    let token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjliMTA2NmViOWY5MDkxMDc0MDRkYTQiLCJ1c2VybmFtZSI6Ikd1c3Rhdm8gUnVlZGEiLCJlbWFpbCI6ImdhcmVfOThAaG90bWFpbC5jb20iLCJpYXQiOjE2MDQxOTYyNDksImV4cCI6MTYwNDI4MjY0OX0.ze-JuaNgopJv3WSlSkhLVnyc0eTT0SaaNvSbee3piXA'

    this.wapixService.getWapixFromUser(email, token)
      .then( data => {
        console.log(data);
        this.wapixes = data.wapix;
      })
      .catch( err => {
        console.error(err);
      });

  }



}
