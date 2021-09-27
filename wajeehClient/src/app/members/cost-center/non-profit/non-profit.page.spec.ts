import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonProfitPage } from './non-profit.page';

describe('NonProfitPage', () => {
  let component: NonProfitPage;
  let fixture: ComponentFixture<NonProfitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonProfitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonProfitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
