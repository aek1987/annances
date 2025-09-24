import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtrepriseSettingComponent } from './etreprise-setting.component';

describe('EtrepriseSettingComponent', () => {
  let component: EtrepriseSettingComponent;
  let fixture: ComponentFixture<EtrepriseSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtrepriseSettingComponent]
    });
    fixture = TestBed.createComponent(EtrepriseSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
