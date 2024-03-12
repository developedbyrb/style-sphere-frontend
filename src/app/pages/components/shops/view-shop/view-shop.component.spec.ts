import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShopComponent } from './view-shop.component';

describe('ViewShopComponent', () => {
  let component: ViewShopComponent;
  let fixture: ComponentFixture<ViewShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewShopComponent]
    });
    fixture = TestBed.createComponent(ViewShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
