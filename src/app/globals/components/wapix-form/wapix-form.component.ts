/* Font-awesome Icons */
import { faSave,
  faChevronLeft,
  faQuestionCircle,
  faCheckCircle,
  faClock,
  faDice,
  faTrophy } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-wapix-form',
  templateUrl: './wapix-form.component.html',
  styleUrls: ['./wapix-form.component.scss']
})
export class WapixFormComponent implements OnInit {

  faSave = faSave;
  faChevronLeft = faChevronLeft;
  faQuestionCircle = faQuestionCircle;
  faCheckCircle = faCheckCircle;
  faClock =faClock;
  faDice = faDice;
  faTrophy = faTrophy;
  
  @Input('wapix-source') wapixObject:any = {};
  @Output() onSubmitEvent:EventEmitter<any> = new EventEmitter<any>()

  wapixForm: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.wapixForm = this.parseObjectToFormGroup(this.wapixObject);
    console.log(this.wapixForm.value);
  }

  onSubmit(): void {
    console.log(this.wapixForm.value);
    if(this.wapixForm.valid) {
      this.onSubmitEvent.emit(this.wapixForm.value);
    }
  }

  parseObjectToFormGroup(object:any):FormGroup {
    if(Object.entries(object).length == 0) {
      console.log("Wapix nuevo");
      let blankForm:FormGroup = this.fb.group({
        name: [''],
        questions: this.fb.array([
          this.addBlankQuestionFormGroup()
        ])
      });
      return blankForm;
    } else {
      console.log("Wapix ya existente");
      /* Parse the wapix object into a form gropup */
      let tempQuestionsFormArray:FormArray = this.fb.array([]);
      for(let i = 0; i < object.questions.length; i++) {
        let tempAnswersFormArray:FormArray = this.fb.array([]);
        for(let j = 0; j < object.questions[i].answers.length; j++) {
          let tempAnswerFormGroup:FormGroup;
          tempAnswerFormGroup = this.fb.group({ 
            answerText : [object.questions[i].answers[j].answerText],
            isCorrect : [object.questions[i].answers[j].isCorrect]
          });
          tempAnswersFormArray.push(tempAnswerFormGroup);                           
        }
        let tempQuestionFormGroup:FormGroup;
        tempQuestionFormGroup = this.fb.group({
          questionText : [object.questions[i].questionText],
          questionType : [object.questions[i].questionType],
          questionTime : [object.questions[i].questionTime],
          maxPoints : [object.questions[i].maxPoints],
          gameMode : [object.questions[i].gameMode],
          answers: [tempAnswersFormArray]
        });
        tempQuestionsFormArray.push(tempQuestionFormGroup);
      }

      let tempWapixFormGroup:FormGroup = this.fb.group({
        name: [object.name],
        questions: [tempQuestionsFormArray]
      });
      return tempWapixFormGroup;
    }
  }

  addBlankQuestionFormGroup():FormGroup {
    return this.fb.group({
      questionText : [''],
      questionType : ['text'],
      questionTime : ['10'],
      maxPoints : ['100'],
      gameMode : ['normal'],
      answers: this.fb.array([
        this.addBlankAnswerFormGroup()
      ])
    })
  }

  addBlankAnswerFormGroup():FormGroup {
    return this.fb.group({
      answerText : [''],
      isCorrect : ['']
    })
  }

  getQuestionControls():AbstractControl[] {
    return (<FormArray>this.wapixForm.get('questions')).controls;
  }

  getAnswerControls(index:number):AbstractControl[] {
    return (<FormArray>(<FormArray>this.wapixForm.get('questions')).controls[index].get('answers')).controls;
  }

  addQuestionButtonClick():void {
    (<FormArray>this.wapixForm.get('questions')).push(this.addBlankQuestionFormGroup());
  }

  addAnswerButtonClick(index:number):void {
    (<FormArray>(<FormArray>this.wapixForm.get('questions')).controls[index].get('answers')).push(this.addBlankAnswerFormGroup());
  }

  removeQuestionButtonClick(questionIndex:number):void {
    (<FormArray>this.wapixForm.get('questions')).removeAt(questionIndex);
  }

  removeAnswerButtonClick(questionIndex:number, answerIndex:number):void {
    (<FormArray>(<FormArray>this.wapixForm.get('questions')).controls[questionIndex].get('answers')).removeAt(answerIndex);
  }

}
