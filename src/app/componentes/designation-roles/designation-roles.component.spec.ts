import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationRolesComponent } from './designation-roles.component';

describe('DesignationRolesComponent', () => {
  let component: DesignationRolesComponent;
  let fixture: ComponentFixture<DesignationRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
