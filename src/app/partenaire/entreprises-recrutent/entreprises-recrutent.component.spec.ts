import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisesRecrutentComponent } from './entreprises-recrutent.component';

describe('EntreprisesRecrutentComponent', () => {
  let component: EntreprisesRecrutentComponent;
  let fixture: ComponentFixture<EntreprisesRecrutentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntreprisesRecrutentComponent]
    });
    fixture = TestBed.createComponent(EntreprisesRecrutentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
