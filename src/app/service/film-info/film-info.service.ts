import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmInfoService {

  private apiKey = 'aae28dc3';
  constructor(private http: HttpClient) {}

  getFilmInfo(filmId: string):Observable<any>{
    return this.http.get(`https://www.omdbapi.com/?i=${filmId}&apikey=${this.apiKey}`)
  }
}
