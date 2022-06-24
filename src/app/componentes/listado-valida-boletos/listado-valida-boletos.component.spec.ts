import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoValidaBoletosComponent } from './listado-valida-boletos.component';

describe('ListadoValidaBoletosComponent', () => {
  let component: ListadoValidaBoletosComponent;
  let fixture: ComponentFixture<ListadoValidaBoletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoValidaBoletosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoValidaBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
