import { faTimesCircle, faArrowCircleRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/globals/services/auth.service';
import { WapixService } from '../../../globals/services/wapix.service';
import { SocketService } from 'src/app/globals/services/socket.service';
import { ResultsService } from '../../../globals/services/results.service';
import { NavbarConfigService } from 'src/app/globals/services/navbar-config.service';

@Component({
  selector: 'app-wapix-question',
  templateUrl: './wapix-question.component.html',
  styleUrls: ['./wapix-question.component.scss']
})
export class WapixQuestionComponent implements OnInit {

  faTimesCircle = faTimesCircle
  faArrowCircleRight = faArrowCircleRight
  faCheckCircle = faCheckCircle

  wapixId:string;
  resultId:string;
  questionId:string;
  nextQuestionId:string;

  timebar:any;
  interval:any;
  
  requestData:any;
  questionText:string;
  questionPoints:number;
  totalQuestions:number;
  answers:any[];
  seconds:number;
  secondsLeft:number;
  secondsRounded:number;
  questionsAnswered:number = 0;

  isLoaded:boolean = false;
  nextQuestionReady:boolean = false;
  displayCorrect = false;

  constructor(
    private wapixService:WapixService,
    private resultsService:ResultsService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private navbarConfigService:NavbarConfigService,
    private socketService:SocketService,
    private route:Router
  ) { 
    this.navbarConfigService.hideNavbar();
    this.activatedRoute.params.subscribe( params => {
      this.isLoaded = false;
      this.nextQuestionReady = false;
      this.wapixId = params.id;
      this.resultId = params.resultId;
      this.questionId = params.questionId;
      this.nextQuestionId = `${parseInt(this.questionId) + 1}`;

      /* Obtain the token and from the session */
      let token:string = this.authService.getToken();

      this.wapixService.getQuestionFromWapix(this.wapixId, this.questionId, token)
      .then( data => {
        /* Set the question text, options, settings */
        this.requestData = data;
        this.questionText = data.question.questionText;
        this.questionPoints = data.question.questionPoints;
        this.totalQuestions = data.total;
        this.answers = data.question.answers;
        this.seconds = data.question.questionTime + 1;
        this.secondsLeft = this.seconds;
        this.secondsRounded = this.seconds;
        this.isLoaded = true;
        this.timebar = document.getElementById("time-bar-element");

        /* Start the time interval */
        this.interval = setInterval(() => {
          if(this.secondsLeft > 0) {
            this.timebar.style.width = `${(100 * this.secondsLeft) / this.seconds}%`;
            this.secondsLeft -= 0.01;
            this.secondsRounded = Math.trunc(this.secondsLeft);
          } else {
            this.displayCorrect = true;
            /* Block answers submission */
            this.socketService.emit('wapix-timeout', this.wapixId);
            /* Clear the timeout */
            clearInterval(this.interval);
            /* Unlock next question */
            if(parseInt(this.questionId) <= this.totalQuestions) {
              this.nextQuestionReady = true
            }
          }
        }, 10);

        /* Save the question in the result stored in the db */
        let question = JSON.parse(JSON.stringify(this.requestData.question));
        question.questionNumber = parseInt(this.questionId);
        question.submissions = [];
        let requestQuestion = {
          question : question
        };

        this.resultsService.addQuestionToResult(requestQuestion, this.resultId, token)
         .then((response) => {
          /* Emit the question */
          let dataToEmit = JSON.parse(JSON.stringify(data));
          dataToEmit.wapixId = this.wapixId;
          dataToEmit.resultId = this.resultId;
          dataToEmit.questionNumber = this.questionId;
          this.socketService.emit('wapix-host-show-question', dataToEmit);
         })
         .catch( err => {
          console.error(err);
          alert("Sucedió un error a la hora de guardar la pregunta en los results el wapix.");
         });
      });
    });
  }

  ngOnInit(): void {
    this.socketService.on('wapix-update-answers-number', () => {
      this.questionsAnswered += 1;
    });
  }

  exitWapix():void {
    this.socketService.emit('wapix-host-ends-game', this.wapixId);
    this.navbarConfigService.showNavbar();
    clearInterval(this.interval);
  }

  nextQuestion():void {
    this.displayCorrect = false;
    this.questionsAnswered = 0;
    if(parseInt(this.questionId) == this.totalQuestions) {
      /* Disable Wapix */
      let token:string = this.authService.getToken();
      this.wapixService.deactivateWapix(this.wapixId, token)
       .then((deactivated) => {
          /* Notify the Wapix has ended */
          this.socketService.emit('wapix-host-completes-game', this.wapixId);
          this.route.navigate(['/podium']);
       })
       .catch( err => {
         console.error(err);
         alert('Ocurrió un problema a la hora de desactivar el Wapix.');
       });
    } else {
      this.socketService.emit('wapix-host-next-question', this.wapixId);  
      this.route.navigate([`/my-wapix/play/${this.wapixId}/question/${this.nextQuestionId}/${this.resultId}`]);
    }  
  }

}
