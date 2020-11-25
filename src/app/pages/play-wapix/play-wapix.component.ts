/* Font Awesome icons */
import { faGamepad, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { WapixService } from '../../globals/services/wapix.service';

import { AuthService } from 'src/app/globals/services/auth.service';

import { SocketService } from '../../globals/services/socket.service';

import { ResultsService } from '../../globals/services/results.service';

import {Router} from '@angular/router';


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
  

  constructor(
    private activatedRoute:ActivatedRoute,
    private wapixService:WapixService,
    private resultsService:ResultsService,
    private authService:AuthService,
    private socketService:SocketService,
    private route:Router)
  {
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
  
    /* Enable game in backend */
    this.socketService.emit('wapix-enable-game', this.wapixId);

    /* Event to display recently joined player */
    this.socketService.on('wapix-send-player', (player) => {
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

  startGame():void {
    /* Obtain the token and from the session */
    let token:string = this.authService.getToken();
    /* Create the result entry in the database */
    let wapix = {
      wapixId : this.wapixId,
      date : `${new Date()}`,
      playersJoined : this.players,
      results : []
    }
    this.resultsService.createResult(wapix, token)
      .then((result) => {
        console.log(result);
        /* Start game in backend */
        this.socketService.emit('wapix-host-start-game', this.wapixId);
        /* Redirect to the first question */
        this.route.navigate([`/my-wapix/play/${this.wapixId}/question/1`]);
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de iniciar el wapix.");
      });
  }

}
