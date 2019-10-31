import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetentieBeoordelenComponent } from './competentie-beoordelen.component';

describe('CompetentieBeoordelenComponent', () => {
  let component: CompetentieBeoordelenComponent;
  let fixture: ComponentFixture<CompetentieBeoordelenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetentieBeoordelenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetentieBeoordelenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
