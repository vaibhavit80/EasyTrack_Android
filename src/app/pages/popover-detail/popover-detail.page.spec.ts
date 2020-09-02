import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverDetailPage } from './popover-detail.page';

describe('PopoverDetailPage', () => {
  let component: PopoverDetailPage;
  let fixture: ComponentFixture<PopoverDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
