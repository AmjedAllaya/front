import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAffComponent } from './form-aff.component';

describe('FormAffComponent', () => {
  let component: FormAffComponent;
  let fixture: ComponentFixture<FormAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
