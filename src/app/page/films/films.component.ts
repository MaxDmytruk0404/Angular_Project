import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SearchComponent } from '../../page-component/search/search.component';
import { FilmsService } from '../../service/films/films.service';
import { SearchService } from '../../service/search/search.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, SearchComponent],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsComponent implements OnInit {
  films: any[] = [];
  errorMessage: string = '';
  maxNumberPage: number = 1;
  receviedFilm: boolean = false;
  page: number = 1;
  filmId: string = '';
  saveMasive: any[] = [];
  api: string = environment.ApiOMDB;
  // categoty

  searchProces: boolean = false;

  constructor(
    private filmsServiсe: FilmsService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {

      this.getFilmsByCategory();

    });

  }

  // Отримання фільмів

  getFilmsByCategory(): void {

    this.searchProces = true;

    if (typeof window !== 'undefined' && window.localStorage) {

      const serchParamsLocal = localStorage.getItem('searchParams');

      const searchParams = serchParamsLocal ? JSON.parse(serchParamsLocal) : {};

      let filmApi;

      if (searchParams.category == 'all') {

        filmApi = `${this.api}?s=${searchParams.name}&page=${searchParams.page}&apikey=aae28dc3`;

      } else {

        filmApi = `${this.api}?type=${searchParams.category}&s=${searchParams.name}&page=${searchParams.page}&apikey=aae28dc3`;

      }

      this.filmsServiсe.getAll(filmApi).subscribe((data) => {

        this.films = data.Search;
        this.maxNumberPage = Math.ceil(parseInt(data.totalResults) / 10);
        this.receviedFilm = true;
        this.searchProces = false;
        this.errorMessage = '';

        if (this.maxNumberPage) {
          this.searchService.filterVisibel(true);
        }

        if (isNaN(this.maxNumberPage)) {
          this.errorMessage = 'Not Found!';
          this.receviedFilm = false;
          setTimeout(() => {
            this.errorMessage = this.errorMessage.replace('Not Found!', '');
          }, 2800);
        }

      });

    }

  }

  // перехід на попередню сторінку

  prevPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const filmSerchParamsLocal = localStorage.getItem('searchParams');

      const filmSerchParams = filmSerchParamsLocal
        ? JSON.parse(filmSerchParamsLocal)
        : {};

      if (filmSerchParams.page > 1) {

        const newSerchParsms = {
          name: filmSerchParams.name,
          category: filmSerchParams.category,
          page: filmSerchParams.page - 1,
        };

        this.page = filmSerchParams.page - 1;

        localStorage.setItem('searchParams', JSON.stringify(newSerchParsms));

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

  }

  // Перехід на наступну сторінку

  nextPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const filmSerchParamsLocal = localStorage.getItem('searchParams');

      const filmSerchParams = filmSerchParamsLocal
        ? JSON.parse(filmSerchParamsLocal)
        : {};

      if (filmSerchParams.page < this.maxNumberPage) {

        const newFilmSerchParams = {
          name: filmSerchParams.name,
          category: filmSerchParams.category,
          page: filmSerchParams.page + 1,
        };

        this.page = filmSerchParams.page + 1;

        localStorage.setItem('searchParams', JSON.stringify(newFilmSerchParams));

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

  }

  // Пошук за введеним номером сторінки

  enterPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      if (typeof window !== 'undefined' && window.localStorage) {

        const filmSerchParamsLocal = localStorage.getItem('searchParams');

        const filmSerchParams = filmSerchParamsLocal
          ? JSON.parse(filmSerchParamsLocal)
          : {};

        const newfilmSerchParams = {
          name: filmSerchParams.name,
          category: filmSerchParams.category,
          page: this.page,
        };

        localStorage.setItem('searchParams', JSON.stringify(newfilmSerchParams));

        if (filmSerchParams.page > this.maxNumberPage) {

          const newfilmSerchParams = {
            name: filmSerchParams.name,
            category: filmSerchParams.category,
            page: this.maxNumberPage,

          };

          localStorage.setItem('searchParams', JSON.stringify(newfilmSerchParams));
          this.getFilmsByCategory();
          this.page = this.maxNumberPage;

        } else if (filmSerchParams.page < 1) {

          const newfilmSerchParams = {
            name: filmSerchParams.name,
            category: filmSerchParams.category,
            page: 1,

          };

          localStorage.setItem('searchParams', JSON.stringify(newfilmSerchParams));
          this.getFilmsByCategory();
          this.page = 1;

        } else {

          this.getFilmsByCategory();
          this.errorMessage = '';

        }

      }

    }

  }

  // Збереження фільму

  saveFilm(
    filmPoster: string,
    filmTitle: string,
    filmType: string,
    filmYear: string,
    filmId: string
  ): void {

    if (typeof localStorage !== 'undefined') {

      const getSaveFilm = localStorage.getItem('filmSaveInfo');

      if (getSaveFilm) {

        const getFilmInfo = JSON.parse(getSaveFilm);

        for (let filmInfo of getFilmInfo) {

          if (filmId !== filmInfo.id) {
            this.saveMasive.push(filmInfo);
          }

        }

        alert(`${filmTitle} add to save`);
      }

    }

    const filmSaveInfo = {
      poster: filmPoster,
      title: filmTitle,
      type: filmType,
      year: filmYear,
      id: filmId,
    };

    this.saveMasive.push(filmSaveInfo);
    localStorage.setItem('filmSaveInfo', JSON.stringify(this.saveMasive));
    this.saveMasive = [];

  }

}
