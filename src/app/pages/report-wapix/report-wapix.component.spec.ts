import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWapixComponent } from './report-wapix.component';

describe('ReportWapixComponent', () => {
  let component: ReportWapixComponent;
  let fixture: ComponentFixture<ReportWapixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWapixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWapixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
