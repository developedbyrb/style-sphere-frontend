import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShopsComponent } from './list-shops.component';

describe('ListShopsComponent', () => {
  let component: ListShopsComponent;
  let fixture: ComponentFixture<ListShopsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListShopsComponent]
    });
    fixture = TestBed.createComponent(ListShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
