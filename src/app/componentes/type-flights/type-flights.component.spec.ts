import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFlightsComponent } from './type-flights.component';

describe('TypeFlightsComponent', () => {
  let component: TypeFlightsComponent;
  let fixture: ComponentFixture<TypeFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
