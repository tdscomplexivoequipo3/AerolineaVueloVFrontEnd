import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlaneComponent } from './register-plane.component';

describe('RegisterPlaneComponent', () => {
  let component: RegisterPlaneComponent;
  let fixture: ComponentFixture<RegisterPlaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPlaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
