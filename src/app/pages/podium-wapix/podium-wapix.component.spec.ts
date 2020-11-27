import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodiumWapixComponent } from './podium-wapix.component';

describe('PodiumWapixComponent', () => {
  let component: PodiumWapixComponent;
  let fixture: ComponentFixture<PodiumWapixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodiumWapixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodiumWapixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
