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
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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
      questions: this.fb.group({
        questionText : [''],
        questionType : ['text'],
        questionTime : ['10'],
        maxPoints : ['100'],
        gameMode : ['normal']
      })
    });
  }

  onSubmit(): void {
    console.log(this.wapixForm.value);
  }

}
