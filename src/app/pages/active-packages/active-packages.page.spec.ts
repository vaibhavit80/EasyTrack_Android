import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePackagesPage } from './active-packages.page';

describe('ActivePackagesPage', () => {
  let component: ActivePackagesPage;
  let fixture: ComponentFixture<ActivePackagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePackagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePackagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
