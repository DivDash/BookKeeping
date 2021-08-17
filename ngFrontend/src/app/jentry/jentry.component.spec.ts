import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JentryComponent } from './jentry.component';

describe('JentryComponent', () => {
  let component: JentryComponent;
  let fixture: ComponentFixture<JentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
