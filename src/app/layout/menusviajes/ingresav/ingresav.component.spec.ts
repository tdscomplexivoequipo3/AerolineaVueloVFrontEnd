import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresavComponent } from './ingresav.component';

describe('IngresavComponent', () => {
  let component: IngresavComponent;
  let fixture: ComponentFixture<IngresavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
