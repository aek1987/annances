import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskIAComponent } from './ask-ia.component';

describe('AskIAComponent', () => {
  let component: AskIAComponent;
  let fixture: ComponentFixture<AskIAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskIAComponent]
    });
    fixture = TestBed.createComponent(AskIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
