import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbookComponent } from './list-book.component';

describe('ListbookComponent', () => {
  let component: ListbookComponent;
  let fixture: ComponentFixture<ListbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListbookComponent]
    });
    fixture = TestBed.createComponent(ListbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
