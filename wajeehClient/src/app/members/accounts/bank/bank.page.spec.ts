import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankPage } from './bank.page';

describe('BankPage', () => {
  let component: BankPage;
  let fixture: ComponentFixture<BankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
