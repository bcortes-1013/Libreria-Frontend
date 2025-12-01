import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogBookComponent } from './catalog-book.component';

describe('CatalogBookComponent', () => {
  let component: CatalogBookComponent;
  let fixture: ComponentFixture<CatalogBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalogBookComponent]
    });
    fixture = TestBed.createComponent(CatalogBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
