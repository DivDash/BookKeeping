import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPage } from './cash.page';

describe('CashPage', () => {
  let component: CashPage;
  let fixture: ComponentFixture<CashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
