import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVuelosComponent } from './registro-vuelos.component';

describe('RegistroVuelosComponent', () => {
  let component: RegistroVuelosComponent;
  let fixture: ComponentFixture<RegistroVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroVuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
