import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategoryProductsComponent } from './show-category-products.component';

describe('ShowCategoryProductsComponent', () => {
  let component: ShowCategoryProductsComponent;
  let fixture: ComponentFixture<ShowCategoryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCategoryProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
