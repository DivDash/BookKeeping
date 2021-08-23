import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableComponent } from './reusable-table.component';

describe('ReusableTableComponent', () => {
  let component: ReusableTableComponent;
  let fixture: ComponentFixture<ReusableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
