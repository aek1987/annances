import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesOffresComponent } from './mes-offres.component';

describe('MesOffresComponent', () => {
  let component: MesOffresComponent;
  let fixture: ComponentFixture<MesOffresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesOffresComponent]
    });
    fixture = TestBed.createComponent(MesOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
