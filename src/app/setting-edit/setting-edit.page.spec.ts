import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingEDITPage } from './setting-edit.page';

describe('SettingEDITPage', () => {
  let component: SettingEDITPage;
  let fixture: ComponentFixture<SettingEDITPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingEDITPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingEDITPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
