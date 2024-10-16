import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Film {
  id: string;
}

@Component({
  selector: 'app-films-save',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './films-save.component.html',
  styleUrl: './films-save.component.css',
})

export class FilmsSaveComponent implements OnInit {
  
  filmSave: any[] = [];

  ngOnInit(): void {

    this.getFilmSave();

  }

  // Отримання фільмів

  getFilmSave() {
    
    if (typeof localStorage !== 'undefined') {

      const getSaveFilm = localStorage.getItem('filmSaveInfo');

      if (getSaveFilm) {

        const getFilmInfo = JSON.parse(getSaveFilm);
        this.filmSave = getFilmInfo;

      }

    }

  }

  // Видалення фільмів

  removeFilm(filmId: string) {

    if (typeof localStorage !== 'undefined') {

      const getSaveFilm = localStorage.getItem('filmSaveInfo');

      if (getSaveFilm) {

        let getFilmInfo = JSON.parse(getSaveFilm);
        getFilmInfo = getFilmInfo.filter((film: Film) => film.id !== filmId);
        this.filmSave = getFilmInfo;
        localStorage.setItem('filmSaveInfo', JSON.stringify(this.filmSave));

      }
      
    }

  }

}
