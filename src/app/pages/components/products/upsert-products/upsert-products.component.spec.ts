import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertProductsComponent } from './upsert-products.component';

describe('UpsertProductsComponent', () => {
  let component: UpsertProductsComponent;
  let fixture: ComponentFixture<UpsertProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpsertProductsComponent]
    });
    fixture = TestBed.createComponent(UpsertProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
