import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonProfitComponent } from './non-profit.component';

describe('NonProfitComponent', () => {
  let component: NonProfitComponent;
  let fixture: ComponentFixture<NonProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonProfitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
