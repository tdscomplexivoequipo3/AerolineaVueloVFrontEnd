import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionesgComponent } from './condicionesg.component';

describe('CondicionesgComponent', () => {
  let component: CondicionesgComponent;
  let fixture: ComponentFixture<CondicionesgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicionesgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionesgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
