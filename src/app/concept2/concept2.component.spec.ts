import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Concept2Component } from './concept2.component';

describe('Concept2Component', () => {
  let component: Concept2Component;
  let fixture: ComponentFixture<Concept2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Concept2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Concept2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
