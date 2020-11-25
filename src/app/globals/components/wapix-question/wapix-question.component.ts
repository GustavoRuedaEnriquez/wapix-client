import { faTimesCircle, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { WapixService } from '../../../globals/services/wapix.service';

import { AuthService } from 'src/app/globals/services/auth.service';

import { NavbarConfigService } from 'src/app/globals/services/navbar-config.service';

import { SocketService } from 'src/app/globals/services/socket.service';

@Component({
  selector: 'app-wapix-question',
  templateUrl: './wapix-question.component.html',
  styleUrls: ['./wapix-question.component.scss']
})
export class WapixQuestionComponent implements OnInit {

  faTimesCircle = faTimesCircle
  faArrowCircleRight = faArrowCircleRight

  wapixId:string;
  questionId:string;
  nextQuestionId:string;

  timebar:any;
  interval:any;
  
  questionText:string;
  questionPoints:number;
  totalQuestions:number;
  answers:any[];
  seconds:number;
  secondsLeft:number;
  secondsRounded:number;

  isLoaded:boolean = false;
  nextQuestionReady:boolean = false;

  constructor(
    private wapixService:WapixService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private navbarConfigService:NavbarConfigService,
    private socketService:SocketService
  ) { 
    this.navbarConfigService.hideNavbar();
    this.activatedRoute.params.subscribe( params => {
      this.isLoaded = false;
      this.nextQuestionReady = false;
      this.wapixId = params.id;
      this.questionId = params.questionId;
      this.nextQuestionId = `${parseInt(this.questionId) + 1}`;

      /* Obtain the token and from the session */
      let token:string = this.authService.getToken();

      this.wapixService.getQuestionFromWapix(this.wapixId, this.questionId, token)
      .then( data => {
        /* Emit the question */
        let dataToEmit = JSON.parse(JSON.stringify(data));
        dataToEmit.wapixId = this.wapixId;
        this.socketService.emit('wapix-host-show-question', dataToEmit);

        this.questionText = data.question.questionText;
        this.questionPoints = data.question.questionPoints;
        this.totalQuestions = data.total;
        this.answers = data.question.answers;
        this.seconds = data.question.questionTime + 1;
        this.secondsLeft = this.seconds;
        this.secondsRounded = this.seconds;
        this.isLoaded = true;
        this.timebar = document.getElementById("time-bar-element");

        this.interval = setInterval(() => {
          if(this.secondsLeft > 0) {
            this.timebar.style.width = `${(100 * this.secondsLeft) / this.seconds}%`;
            this.secondsLeft -= 0.01;
            this.secondsRounded = Math.trunc(this.secondsLeft);
          } else {
            clearInterval(this.interval);
            if(parseInt(this.questionId) < this.totalQuestions) {
              this.nextQuestionReady = true
            }
          }
        }, 10);

      });

    })
  }

  ngOnInit(): void {
    
  }

  exitWapix():void {
    this.navbarConfigService.showNavbar();
    clearInterval(this.interval);
  }

}
