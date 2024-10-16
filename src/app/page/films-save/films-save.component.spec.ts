import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsSaveComponent } from './films-save.component';

describe('FilmsSaveComponent', () => {
  let component: FilmsSaveComponent;
  let fixture: ComponentFixture<FilmsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
