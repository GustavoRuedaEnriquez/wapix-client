import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WapixQuestionsGuestComponent } from './wapix-questions-guest.component';

describe('WapixQuestionsGuestComponent', () => {
  let component: WapixQuestionsGuestComponent;
  let fixture: ComponentFixture<WapixQuestionsGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WapixQuestionsGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WapixQuestionsGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
