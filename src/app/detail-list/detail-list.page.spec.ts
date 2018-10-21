import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailListPage } from './detail-list.page';

describe('DetailListPage', () => {
  let component: DetailListPage;
  let fixture: ComponentFixture<DetailListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
