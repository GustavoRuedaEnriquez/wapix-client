import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWapixComponent } from './edit-wapix.component';

describe('EditWapixComponent', () => {
  let component: EditWapixComponent;
  let fixture: ComponentFixture<EditWapixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWapixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWapixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
