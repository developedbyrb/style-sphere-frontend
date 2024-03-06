import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertShopComponent } from './upsert-shop.component';

describe('UpsertShopComponent', () => {
  let component: UpsertShopComponent;
  let fixture: ComponentFixture<UpsertShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpsertShopComponent]
    });
    fixture = TestBed.createComponent(UpsertShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
