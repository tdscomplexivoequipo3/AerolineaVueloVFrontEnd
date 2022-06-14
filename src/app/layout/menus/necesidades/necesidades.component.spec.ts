import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecesidadesComponent } from './necesidades.component';

describe('NecesidadesComponent', () => {
  let component: NecesidadesComponent;
  let fixture: ComponentFixture<NecesidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecesidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NecesidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
