import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootertabComponent } from './footertab.component';

describe('FootertabComponent', () => {
  let component: FootertabComponent;
  let fixture: ComponentFixture<FootertabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootertabComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootertabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
