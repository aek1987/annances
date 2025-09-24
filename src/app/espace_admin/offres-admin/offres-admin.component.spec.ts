import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresAdminComponent } from './offres-admin.component';

describe('OffresAdminComponent', () => {
  let component: OffresAdminComponent;
  let fixture: ComponentFixture<OffresAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffresAdminComponent]
    });
    fixture = TestBed.createComponent(OffresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
