import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeScannerPage } from './barcode-scanner.page';

describe('BarcodeScannerPage', () => {
  let component: BarcodeScannerPage;
  let fixture: ComponentFixture<BarcodeScannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeScannerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
