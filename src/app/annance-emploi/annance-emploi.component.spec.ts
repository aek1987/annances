import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceEmploiComponent } from './annance-emploi.component';

describe('AnnonceEmploiComponent', () => {
  let component: AnnonceEmploiComponent;
  let fixture: ComponentFixture<AnnonceEmploiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceEmploiComponent]
    });
    fixture = TestBed.createComponent(AnnonceEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
