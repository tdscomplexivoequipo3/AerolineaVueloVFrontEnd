import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFlightCharterComponent } from './register-flight-charter.component';

describe('RegisterFlightCharterComponent', () => {
  let component: RegisterFlightCharterComponent;
  let fixture: ComponentFixture<RegisterFlightCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFlightCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFlightCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
