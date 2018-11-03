import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodRankPage } from './food-rank.page';

describe('FoodRankPage', () => {
  let component: FoodRankPage;
  let fixture: ComponentFixture<FoodRankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodRankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodRankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
