import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSeatComponent } from './register-seat.component';

describe('RegisterSeatComponent', () => {
  let component: RegisterSeatComponent;
  let fixture: ComponentFixture<RegisterSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
