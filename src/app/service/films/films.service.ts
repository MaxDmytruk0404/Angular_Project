import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  constructor(private http: HttpClient) {}

  getAll(
    filmApi: string
  ): Observable<any> {

    return this.http.get(filmApi)
  }
}
