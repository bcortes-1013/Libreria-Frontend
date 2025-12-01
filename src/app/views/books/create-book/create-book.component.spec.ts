import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebookComponent } from './create-book.component';

describe('CreatebookComponent', () => {
  let component: CreatebookComponent;
  let fixture: ComponentFixture<CreatebookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreatebookComponent]
    });
    fixture = TestBed.createComponent(CreatebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
