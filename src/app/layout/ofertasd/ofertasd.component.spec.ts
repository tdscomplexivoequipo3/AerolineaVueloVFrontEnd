import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasdComponent } from './ofertasd.component';

describe('OfertasdComponent', () => {
  let component: OfertasdComponent;
  let fixture: ComponentFixture<OfertasdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertasdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
