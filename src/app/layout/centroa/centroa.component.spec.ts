import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroaComponent } from './centroa.component';

describe('CentroaComponent', () => {
  let component: CentroaComponent;
  let fixture: ComponentFixture<CentroaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
