import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTwoPage } from './cart-two.page';

describe('CartTwoPage', () => {
  let component: CartTwoPage;
  let fixture: ComponentFixture<CartTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartTwoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
