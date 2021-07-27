import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingModalComponent } from './thing-modal.component';

describe('ThingModalComponent', () => {
  let component: ThingModalComponent;
  let fixture: ComponentFixture<ThingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
