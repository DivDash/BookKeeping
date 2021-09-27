import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntriesPage } from './journal-entries.page';

describe('JournalEntriesPage', () => {
  let component: JournalEntriesPage;
  let fixture: ComponentFixture<JournalEntriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalEntriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
