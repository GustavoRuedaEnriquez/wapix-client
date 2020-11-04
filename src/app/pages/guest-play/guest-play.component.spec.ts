import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPlayComponent } from './guest-play.component';

describe('GuestPlayComponent', () => {
  let component: GuestPlayComponent;
  let fixture: ComponentFixture<GuestPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
