import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaCharterComponent } from './reserva-charter.component';

describe('ReservaCharterComponent', () => {
  let component: ReservaCharterComponent;
  let fixture: ComponentFixture<ReservaCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
