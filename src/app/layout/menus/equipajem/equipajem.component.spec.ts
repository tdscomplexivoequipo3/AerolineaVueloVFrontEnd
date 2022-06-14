import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipajemComponent } from './equipajem.component';

describe('EquipajemComponent', () => {
  let component: EquipajemComponent;
  let fixture: ComponentFixture<EquipajemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipajemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipajemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
