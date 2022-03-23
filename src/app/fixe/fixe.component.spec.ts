import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixeComponent } from './fixe.component';

describe('FixeComponent', () => {
  let component: FixeComponent;
  let fixture: ComponentFixture<FixeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
