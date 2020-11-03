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
    this.wapixForm = this.fb.group({
      name: [''],
      questions: this.fb.array([
        this.addBlankQuestionFormGroup()
      ])
    });
    if(Object.entries(this.wapixObject).length != 0) {
      this.parseObjectToFormGroupAndUpdateForm(this.wapixObject)
    }
  }

  onSubmit(): void {
    if(this.wapixForm.valid) {
      this.onSubmitEvent.emit(this.wapixForm.value);
    }
  }

  parseObjectToFormGroupAndUpdateForm(object:any):void {
    console.log("Cargando wapix ya existente.");
    console.log(object);

    this.questions().removeAt(0);
    
    for(let i = 0; i < object.questions.length; i++) {
      let tempQuestion:FormGroup = this.addBlankQuestionFormGroup();
      this.questions().push(tempQuestion);
      console.log(object.questions[i].answers.length)
      for(let j = 0; j < object.questions[i].answers.length - 1; j++) {
        console.log(j)
        let tempAnswer:FormGroup = this.addBlankAnswerFormGroup();
        this.answers(i).push(tempAnswer);
      }
    }
    
    this.wapixForm.patchValue({
      name : object.name,
      questions : object.questions
    })
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

  addBlankQuestionFormGroupEmptyAnswer():FormGroup {
    return this.fb.group({
      questionText : [''],
      questionType : ['text'],
      questionTime : ['10'],
      maxPoints : ['100'],
      gameMode : ['normal'],
      answers: this.fb.array([])
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

  questions(): FormArray {
    return this.wapixForm.get("questions") as FormArray;
  }

  answers(index:number): FormArray {
    return this.questions().at(index).get("answers") as FormArray;
  }

}
