import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMapPage } from './show-map.page';

describe('ShowMapPage', () => {
  let component: ShowMapPage;
  let fixture: ComponentFixture<ShowMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
