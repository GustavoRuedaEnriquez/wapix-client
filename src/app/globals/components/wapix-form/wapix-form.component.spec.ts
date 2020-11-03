import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WapixFormComponent } from './wapix-form.component';

describe('WapixFormComponent', () => {
  let component: WapixFormComponent;
  let fixture: ComponentFixture<WapixFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WapixFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WapixFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
