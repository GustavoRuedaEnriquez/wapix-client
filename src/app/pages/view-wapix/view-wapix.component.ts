import { faPlayCircle, faEdit, faTrashAlt, faPlusCircle, faSurprise } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { WapixService } from '../../globals/services/wapix.service'
import { AuthService } from 'src/app/globals/services/auth.service';

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

  constructor(private wapixService:WapixService, private authService: AuthService) { }

  ngOnInit(): void {
    /*
      Obtain the token and the email from the session,
      for now, it is hardcoded.
    */
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
}
