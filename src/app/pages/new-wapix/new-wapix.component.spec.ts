import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWapixComponent } from './new-wapix.component';

describe('NewWapixComponent', () => {
  let component: NewWapixComponent;
  let fixture: ComponentFixture<NewWapixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWapixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWapixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
