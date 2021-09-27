import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterPage } from './cost-center.page';

describe('CostCenterPage', () => {
  let component: CostCenterPage;
  let fixture: ComponentFixture<CostCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
