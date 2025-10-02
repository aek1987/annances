import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatDetailComponent } from './candidat-detail.component';

describe('CandidatDetailComponent', () => {
  let component: CandidatDetailComponent;
  let fixture: ComponentFixture<CandidatDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatDetailComponent]
    });
    fixture = TestBed.createComponent(CandidatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
