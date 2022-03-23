import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAffComponent } from './profil-aff.component';

describe('ProfilAffComponent', () => {
  let component: ProfilAffComponent;
  let fixture: ComponentFixture<ProfilAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilAffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
