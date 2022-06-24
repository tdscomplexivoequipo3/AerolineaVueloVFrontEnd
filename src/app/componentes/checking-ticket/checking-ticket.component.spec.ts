import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingTicketComponent } from './checking-ticket.component';

describe('CheckingTicketComponent', () => {
  let component: CheckingTicketComponent;
  let fixture: ComponentFixture<CheckingTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckingTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckingTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
