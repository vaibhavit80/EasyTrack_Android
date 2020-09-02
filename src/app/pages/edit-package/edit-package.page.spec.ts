import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackagePage } from './edit-package.page';

describe('EditPackagePage', () => {
  let component: EditPackagePage;
  let fixture: ComponentFixture<EditPackagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPackagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
