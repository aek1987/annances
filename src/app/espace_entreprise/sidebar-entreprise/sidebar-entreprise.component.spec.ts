import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEntrepriseComponent } from './sidebar-entreprise.component';

describe('SidebarEntrepriseComponent', () => {
  let component: SidebarEntrepriseComponent;
  let fixture: ComponentFixture<SidebarEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarEntrepriseComponent]
    });
    fixture = TestBed.createComponent(SidebarEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
