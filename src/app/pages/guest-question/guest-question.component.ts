import { Component, OnInit } from '@angular/core';
import { NavbarConfigService } from '../../globals/services/navbar-config.service';
import { ActivatedRoute } from '@angular/router';
import { ResultsService } from '../../globals/services/results.service';
import { SocketService } from '../../globals/services/socket.service';
import { AuthService } from 'src/app/globals/services/auth.service';

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

  constructor(
    private navbarConfigService:NavbarConfigService,
    private activatedRoute:ActivatedRoute,
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
    this.socketService.on('wapix-send-question', (data) => {
      this.data = data;
      this.questionNumber = parseInt(data.questionNumber);
      this.question = this.data.question;
      this.answers = this.question.answers;
    });
  }

  clickedAnswer(answer):void {
    /* Block the buttons */
    
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
