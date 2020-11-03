import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayWapixComponent } from './play-wapix.component';

describe('MainPlayComponent', () => {
  let component: PlayWapixComponent;
  let fixture: ComponentFixture<PlayWapixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayWapixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayWapixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
