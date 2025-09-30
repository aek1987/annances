import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreDetailComponent } from './offre-detail.component';

describe('OffreDetailComponent', () => {
  let component: OffreDetailComponent;
  let fixture: ComponentFixture<OffreDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreDetailComponent]
    });
    fixture = TestBed.createComponent(OffreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
