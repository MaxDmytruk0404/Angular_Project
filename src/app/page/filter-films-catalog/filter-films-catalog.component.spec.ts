import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFilmsCatalogComponent } from './filter-films-catalog.component';

describe('FilterFilmsCatalogComponent', () => {
  let component: FilterFilmsCatalogComponent;
  let fixture: ComponentFixture<FilterFilmsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterFilmsCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterFilmsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
