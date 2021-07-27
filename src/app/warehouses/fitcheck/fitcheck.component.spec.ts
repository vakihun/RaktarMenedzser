import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitcheckComponent } from './fitcheck.component';

describe('FitcheckComponent', () => {
  let component: FitcheckComponent;
  let fixture: ComponentFixture<FitcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitcheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FitcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
