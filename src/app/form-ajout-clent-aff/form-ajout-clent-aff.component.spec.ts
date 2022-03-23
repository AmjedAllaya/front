import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAjoutClentAffComponent } from './form-ajout-clent-aff.component';

describe('FormAjoutClentAffComponent', () => {
  let component: FormAjoutClentAffComponent;
  let fixture: ComponentFixture<FormAjoutClentAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAjoutClentAffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAjoutClentAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
