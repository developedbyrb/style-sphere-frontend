import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogComponent } from './dailog.component';

describe('DailogComponent', () => {
  let component: DailogComponent;
  let fixture: ComponentFixture<DailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DailogComponent]
    });
    fixture = TestBed.createComponent(DailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
