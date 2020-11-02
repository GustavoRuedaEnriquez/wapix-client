import { faPlayCircle, faEdit, faTrashAlt, faPlusCircle, faSurprise } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';

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
    let token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjliMTA2NmViOWY5MDkxMDc0MDRkYTQiLCJ1c2VybmFtZSI6Ikd1c3Rhdm8gUnVlZGEiLCJlbWFpbCI6ImdhcmVfOThAaG90bWFpbC5jb20iLCJpYXQiOjE2MDQyODc1MDEsImV4cCI6MTYwNDM3MzkwMX0.098_dds3ZRDPSdzPE4v2wRa_Y8c8UkjAChbWdrgYjAE'

    this.wapixService.getWapixFromUser(email, token)
      .then( data => {
        this.wapixes = data.wapix;
      })
      .catch( err => {
        console.error(err);
      });

  }
}
