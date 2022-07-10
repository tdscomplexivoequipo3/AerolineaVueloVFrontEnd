import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsStadisticsComponent } from './flights-stadistics.component';

describe('FlightsStadisticsComponent', () => {
  let component: FlightsStadisticsComponent;
  let fixture: ComponentFixture<FlightsStadisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsStadisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsStadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
