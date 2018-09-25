import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartloadPage } from './cartload.page';

describe('CartloadPage', () => {
  let component: CartloadPage;
  let fixture: ComponentFixture<CartloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartloadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
