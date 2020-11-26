import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestQuestionComponent } from './guest-question.component';

describe('GuestQuestionComponent', () => {
  let component: GuestQuestionComponent;
  let fixture: ComponentFixture<GuestQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
