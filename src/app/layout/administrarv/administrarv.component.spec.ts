import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarvComponent } from './administrarv.component';

describe('AdministrarvComponent', () => {
  let component: AdministrarvComponent;
  let fixture: ComponentFixture<AdministrarvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
