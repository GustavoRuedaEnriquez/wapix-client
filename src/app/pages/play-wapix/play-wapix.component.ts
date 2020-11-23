/* Font Awesome icons */
import { faGamepad, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { WapixService } from '../../globals/services/wapix.service';

import { AuthService } from 'src/app/globals/services/auth.service';

import { SocketService } from '../../globals/services/socket.service';


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
  players:Array<any> = [];
  numberOfPlayers:number = 0;
  

  constructor(private activatedRoute:ActivatedRoute, private wapixService:WapixService, private authService:AuthService, private socketService:SocketService) {
    this.activatedRoute.params.subscribe( params => {
      this.wapixId = params.id;
    })
   }

   
  ngOnInit(): void {
    let token:string = this.authService.getToken();
    this.wapixService.activateWapix(this.wapixId, token)
      .then( activated => {
        this.wapixService.getWapixFromId(this.wapixId, token)
          .then( data => {
            this.wapixObject = data.wapix[0];
            this.wapixCode = this.wapixObject.code;
            this.isLoading = false;
          })
          .catch( err => {
            console.error(err);
            alert("Sucedió un error a la hora de cargar el wapix.");
          });
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de activar el wapix.");
      });

    /* Obtain the token and from the session */
    this.socketService.connect();
    
    /* Start game in backend */
    this.socketService.emit('wapix-start-game', this.wapixId);

    /* Event to display recently joined player */
    this.socketService.on('send-name', (player) => {
      this.players.push(player.username);
      this.numberOfPlayers++;
      console.log(this.players);
    });
  }

  exitClick():void {
    /* Obtain the token and from the session */
    let token:string = this.authService.getToken();
    this.wapixService.deactivateWapix(this.wapixId, token)
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de desactivar el wapix.");
      });
  }

}
