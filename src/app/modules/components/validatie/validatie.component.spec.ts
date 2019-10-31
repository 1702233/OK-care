import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatieComponent } from './validatie.component';

describe('ValidatieComponent', () => {
  let component: ValidatieComponent;
  let fixture: ComponentFixture<ValidatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
