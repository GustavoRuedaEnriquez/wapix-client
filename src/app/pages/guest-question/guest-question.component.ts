import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/globals/services/auth.service';
import { SocketService } from '../../globals/services/socket.service';
import { ResultsService } from '../../globals/services/results.service';
import { NavbarConfigService } from '../../globals/services/navbar-config.service';

@Component({
  selector: 'app-guest-question',
  templateUrl: './guest-question.component.html',
  styleUrls: ['./guest-question.component.scss']
})
export class GuestQuestionComponent implements OnInit {

  username:string = '';
  totalPointsGained = 0;
  pointsPenaltyFactor = 0;
  resultId:string = '';
  questionNumber:number = 1;
  data:any = {};
  question:any = {};
  answers:any = [];
  answerClicked = false;
  showPoints = false;
  hasAnswered = false;
  rand = 0;
  interval:any;

  constructor(
    private navbarConfigService:NavbarConfigService,
    private activatedRoute:ActivatedRoute,
    private route:Router,
    private titleService: Title,
    private socketService:SocketService,
    private resultsService:ResultsService,
    private authService:AuthService)
  {
    this.navbarConfigService.hideNavbar();
    this.activatedRoute.params.subscribe( params => {
      this.username = params.username;
      this.resultId = params.resultId;
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Wapix | Partida');
    /* Event when the question's information is received */
    this.socketService.on('wapix-send-question', (data) => {
      this.data = data;
      this.questionNumber = parseInt(data.questionNumber);
      this.question = this.data.question;
      this.answers = this.question.answers;
    });
    /* Event when the question's time runs out */
    this.socketService.on('wapix-question-timeout', () => {
      /* If the guest did not answered, send the result */
      if(!this.hasAnswered) {
        let data = {
          submission : {
            username : this.username,
            answerSent : '',
            pointsGained : 0
          },
          questionNumber : this.questionNumber
        };
        let token:string = this.authService.getToken();
        /* Store answer in the database */
        this.resultsService.addSubmissionToQuestionOnResult(data, this.resultId, token)
         .catch( err => {
          console.error(err);
          alert("Sucedió un error a la hora de guardar su respuesta.");
        });
      }
      this.hasAnswered = false;
      this.answerClicked = false;
      this.showPoints = true;
    });
    /* Event when the next question is showed in the host */
    this.socketService.on('wapix-next-question', () => {
      this.pointsPenaltyFactor = 0;
      this.answerClicked = false;
      this.showPoints = false;
    });
    /* Event when the Wapix is ended by its host */
    this.socketService.on('wapix-disconnect-player', () => {
      this.socketService.disconnect();
      this.route.navigate([`/guest`]);
    });
    /* Event when the a guest answers a Wapix, needed to increase point penalty */
    this.socketService.on('wapix-client-has-answered-correctly', () => {
      if(this.pointsPenaltyFactor < 18) {
        this.pointsPenaltyFactor += 1;
      }
    });
    /* Event when the Wapix is completed, and the guests send their total score */
    this.socketService.on('wapix-send-total-results', (wapixId) => {
      let data = {
        wapixId : wapixId,
        username : this.username,
        total : this.totalPointsGained
      }
      let i = 2;
      this.interval = setInterval(() => {
        if(i == 0) {
          /* Clear the timeout */
          clearInterval(this.interval);
          this.socketService.emit('wapix-send-to-podium', data);
          this.socketService.disconnect();
          this.route.navigate([`/guest`]);
        } else {
          i--;
        }
      });
    });
  }

  clickedAnswer(answer):void {
    this.hasAnswered = true;
    let points:number = 0;
    /* Emit answer selection to host */
    this.socketService.emit('wapix-client-has-answered', this.data.wapixId);
    /* Verify if the answer is correct and calculatethe points gained */
    if(answer.isCorrect == true) {
      points = Math.floor(this.question.maxPoints - (this.question.maxPoints * 0.05 * this.pointsPenaltyFactor));
      this.socketService.emit('wapix-correct-answer', this.data.wapixId);
    }
    /* Update point count */
    this.totalPointsGained += points;
    /* Create the submission to upload */
    let data = {
      submission : {
        username : this.username,
        answerSent : answer.answerText,
        pointsGained : points
      },
      questionNumber : this.questionNumber
    };
    /* Block the buttons */
    this.answerClicked = true;
    this.rand = Math.floor((Math.random() * 10) + 1);
    /* Obtain the token and from the session */
    let token:string = this.authService.getToken();
    /* Store answer in the database */
    this.resultsService.addSubmissionToQuestionOnResult(data, this.resultId, token)
     .catch( err => {
      console.error(err);
      alert(`Sucedió un error a la hora de guardar su respuesta. Error ${err}`);
     });
  }

}
