import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetentieToevoegenComponent } from './competentie-toevoegen.component';

describe('CompetentieToevoegenComponent', () => {
  let component: CompetentieToevoegenComponent;
  let fixture: ComponentFixture<CompetentieToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetentieToevoegenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetentieToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
