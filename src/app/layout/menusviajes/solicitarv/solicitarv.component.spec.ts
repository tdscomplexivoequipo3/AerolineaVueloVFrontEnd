import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarvComponent } from './solicitarv.component';

describe('SolicitarvComponent', () => {
  let component: SolicitarvComponent;
  let fixture: ComponentFixture<SolicitarvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
