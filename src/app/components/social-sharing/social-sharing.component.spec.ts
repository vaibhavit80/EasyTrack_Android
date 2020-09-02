import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSharingComponent } from './social-sharing.component';

describe('SocialSharingComponent', () => {
  let component: SocialSharingComponent;
  let fixture: ComponentFixture<SocialSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialSharingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
