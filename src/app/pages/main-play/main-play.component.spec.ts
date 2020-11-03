import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPlayComponent } from './main-play.component';

describe('MainPlayComponent', () => {
  let component: MainPlayComponent;
  let fixture: ComponentFixture<MainPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
