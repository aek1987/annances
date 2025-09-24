import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturesAdminComponent } from './candidatures-admin.component';

describe('CandidaturesAdminComponent', () => {
  let component: CandidaturesAdminComponent;
  let fixture: ComponentFixture<CandidaturesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidaturesAdminComponent]
    });
    fixture = TestBed.createComponent(CandidaturesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
