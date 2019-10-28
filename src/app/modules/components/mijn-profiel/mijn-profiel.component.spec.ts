import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MijnProfielComponent } from './mijn-profiel.component';

describe('MijnProfielComponent', () => {
  let component: MijnProfielComponent;
  let fixture: ComponentFixture<MijnProfielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MijnProfielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MijnProfielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
