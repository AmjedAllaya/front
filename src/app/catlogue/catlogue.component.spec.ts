import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatlogueComponent } from './catlogue.component';

describe('CatlogueComponent', () => {
  let component: CatlogueComponent;
  let fixture: ComponentFixture<CatlogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatlogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatlogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
