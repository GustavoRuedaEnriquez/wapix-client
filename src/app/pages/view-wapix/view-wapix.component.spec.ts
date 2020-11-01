import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWapixComponent } from './view-wapix.component';

describe('ViewWapixComponent', () => {
  let component: ViewWapixComponent;
  let fixture: ComponentFixture<ViewWapixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWapixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWapixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
