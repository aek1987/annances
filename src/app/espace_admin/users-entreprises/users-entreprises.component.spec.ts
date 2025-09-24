import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEntreprisesComponent } from './users-entreprises.component';

describe('UsersEntreprisesComponent', () => {
  let component: UsersEntreprisesComponent;
  let fixture: ComponentFixture<UsersEntreprisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersEntreprisesComponent]
    });
    fixture = TestBed.createComponent(UsersEntreprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
