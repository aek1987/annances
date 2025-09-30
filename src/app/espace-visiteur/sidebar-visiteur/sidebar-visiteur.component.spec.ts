import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarVisiteurComponent } from './sidebar-visiteur.component';

describe('SidebarVisiteurComponent', () => {
  let component: SidebarVisiteurComponent;
  let fixture: ComponentFixture<SidebarVisiteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarVisiteurComponent]
    });
    fixture = TestBed.createComponent(SidebarVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
