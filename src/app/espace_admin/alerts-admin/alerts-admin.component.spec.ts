import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsAdminComponent } from './alerts-admin.component';

describe('AlertsAdminComponent', () => {
  let component: AlertsAdminComponent;
  let fixture: ComponentFixture<AlertsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsAdminComponent]
    });
    fixture = TestBed.createComponent(AlertsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
