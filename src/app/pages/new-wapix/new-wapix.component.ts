/* Font-awesome Icons */
import { faSave,
         faChevronLeft,
         faQuestionCircle,
         faCheckCircle,
         faClock,
         faDice,
         faTrophy } from '@fortawesome/free-solid-svg-icons';

/* Required modules */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';

/* Required components */
import { WapixService } from '../../globals/services/wapix.service'

@Component({
  selector: 'app-new-wapix',
  templateUrl: './new-wapix.component.html',
  styleUrls: ['./new-wapix.component.scss']
})
export class NewWapixComponent implements OnInit {

  faSave = faSave;
  faChevronLeft = faChevronLeft;
  faQuestionCircle = faQuestionCircle;
  faCheckCircle = faCheckCircle;
  faClock =faClock;
  faDice = faDice;
  faTrophy = faTrophy;

  wapixForm: FormGroup;

  selectedOption: string="value1";

  constructor(private wapixService:WapixService, private fb:FormBuilder) {  }

  ngOnInit(): void {
    this.wapixForm = this.fb.group({
      name: [''],
      questions: this.fb.array([
        this.addQuestionFormGroup()
      ])
    });
  }

  onSubmit(): void {
    console.log(this.wapixForm.value);
  }

  addQuestionFormGroup():FormGroup {
    return this.fb.group({
      questionText : [''],
      questionType : ['text'],
      questionTime : ['10'],
      maxPoints : ['100'],
      gameMode : ['normal'],
      answers: this.fb.array([
        this.addAnswerFormGroup()
      ])
    })
  }

  addAnswerFormGroup():FormGroup {
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
    (<FormArray>this.wapixForm.get('questions')).push(this.addQuestionFormGroup());
  }

  addAnswerButtonClick(index:number):void {
    (<FormArray>(<FormArray>this.wapixForm.get('questions')).controls[index].get('answers')).push(this.addAnswerFormGroup());
  }

  removeQuestionButtonClick(questionIndex:number):void {
    (<FormArray>this.wapixForm.get('questions')).removeAt(questionIndex);
  }

  removeAnswerButtonClick(questionIndex:number, answerIndex:number):void {
    (<FormArray>(<FormArray>this.wapixForm.get('questions')).controls[questionIndex].get('answers')).removeAt(answerIndex);
  }



}
