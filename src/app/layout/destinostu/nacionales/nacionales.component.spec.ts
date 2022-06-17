import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NacionalesComponent } from './nacionales.component';

describe('NacionalesComponent', () => {
  let component: NacionalesComponent;
  let fixture: ComponentFixture<NacionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NacionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
