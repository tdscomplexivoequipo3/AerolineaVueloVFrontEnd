import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCitiesComponent } from './register-cities.component';

describe('RegisterCitiesComponent', () => {
  let component: RegisterCitiesComponent;
  let fixture: ComponentFixture<RegisterCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
