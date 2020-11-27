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
  resultId:string = '';
  questionNumber:number = 1;
  data:any = {};
  question:any = {};
  answers:any = [];
  answerClicked = false;
  rand = 0;

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
      if( !this.answerClicked ) {
        this.answerClicked = true;
        this.rand = Math.floor((Math.random() * 10) + 1);
      }
    });
    /* Event when the next question is showed in the host */
    this.socketService.on('wapix-next-question', () => {
      this.answerClicked = false;
    });
    /* Event when the Wapix is ended by its host */
    this.socketService.on('wapix-disconnect-player', () => {
      this.socketService.disconnect();
      this.route.navigate([`/guest`]);
    });
  }

  clickedAnswer(answer):void {
    /* Emit answer selection to host */
    this.socketService.emit('wapix-client-has-answered', this.data.wapixId);
    
    /* Block the buttons */
    this.answerClicked = true;
    this.rand = Math.floor((Math.random() * 10) + 1);
    
    /* TODO: Calculate points */

    /* Create the submission to upload */
    let data = {
      submission : {
        username : this.username,
        answerSent : answer.answerText,
        pointsGained : 0
      },
      questionNumber : this.questionNumber
    };
    if(answer.isCorrect == true) {
      data.submission.pointsGained = this.question.maxPoints;
    }
    /* Obtain the token and from the session */
    let token:string = this.authService.getToken();
    /* Store answer in the database */
    this.resultsService.addSubmissionToQuestionOnResult(data, this.resultId, token)
     .catch( err => {
      console.error(err);
      alert("Sucedió un error a la hora de guardar su respuesta.");
     });
  }

}
