import { TestBed } from '@angular/core/testing';

import { FilmInfoService } from './film-info.service';

describe('FilmInfoService', () => {
  let service: FilmInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
