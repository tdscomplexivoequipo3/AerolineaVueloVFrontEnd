import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingFlightsComponent } from './programming-flights.component';

describe('ProgrammingFlightsComponent', () => {
  let component: ProgrammingFlightsComponent;
  let fixture: ComponentFixture<ProgrammingFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammingFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammingFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
