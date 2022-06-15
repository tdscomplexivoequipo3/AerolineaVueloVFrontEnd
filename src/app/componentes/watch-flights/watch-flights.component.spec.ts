import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchFlightsComponent } from './watch-flights.component';

describe('WatchFlightsComponent', () => {
  let component: WatchFlightsComponent;
  let fixture: ComponentFixture<WatchFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
