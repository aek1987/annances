import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCandidatsComponent } from './users-candidats.component';

describe('UsersCandidatsComponent', () => {
  let component: UsersCandidatsComponent;
  let fixture: ComponentFixture<UsersCandidatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersCandidatsComponent]
    });
    fixture = TestBed.createComponent(UsersCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
