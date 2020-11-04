import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WapixQuestionComponent } from './wapix-question.component';

describe('WapixQuestionComponent', () => {
  let component: WapixQuestionComponent;
  let fixture: ComponentFixture<WapixQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WapixQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WapixQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
