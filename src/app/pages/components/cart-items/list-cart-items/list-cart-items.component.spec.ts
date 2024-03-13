import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartItemsComponent } from './list-cart-items.component';

describe('ListCartItemsComponent', () => {
  let component: ListCartItemsComponent;
  let fixture: ComponentFixture<ListCartItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListCartItemsComponent]
    });
    fixture = TestBed.createComponent(ListCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
