import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogerrorComponent } from './dialogerror.component';

describe('DialogerrorComponent', () => {
  let component: DialogerrorComponent;
  let fixture: ComponentFixture<DialogerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogerrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
