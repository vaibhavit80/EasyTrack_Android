import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlChangerPage } from './url-changer.page';

describe('UrlChangerPage', () => {
  let component: UrlChangerPage;
  let fixture: ComponentFixture<UrlChangerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlChangerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlChangerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
