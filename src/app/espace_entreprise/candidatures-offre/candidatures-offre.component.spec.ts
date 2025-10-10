import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturesOffreComponent } from './candidatures-offre.component';

describe('CandidaturesOffreComponent', () => {
  let component: CandidaturesOffreComponent;
  let fixture: ComponentFixture<CandidaturesOffreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidaturesOffreComponent]
    });
    fixture = TestBed.createComponent(CandidaturesOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
