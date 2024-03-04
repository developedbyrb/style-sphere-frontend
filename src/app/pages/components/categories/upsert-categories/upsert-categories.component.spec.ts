import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertCategoriesComponent } from './upsert-categories.component';

describe('UpsertCategoriesComponent', () => {
  let component: UpsertCategoriesComponent;
  let fixture: ComponentFixture<UpsertCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpsertCategoriesComponent]
    });
    fixture = TestBed.createComponent(UpsertCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
