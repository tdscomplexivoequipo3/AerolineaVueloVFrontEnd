import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitosvComponent } from './requisitosv.component';

describe('RequisitosvComponent', () => {
  let component: RequisitosvComponent;
  let fixture: ComponentFixture<RequisitosvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitosvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitosvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
