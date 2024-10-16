import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SearchComponent } from '../../page-component/search/search.component';
import { FilmsService } from '../../service/films/films.service';
import { SearchService } from '../../service/search/search.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-filter-films-catalog',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, SearchComponent],
  templateUrl: './filter-films-catalog.component.html',
  styleUrl: './filter-films-catalog.component.css',
})

export class FilterFilmsCatalogComponent implements OnInit {

  films: any[] = [];
  errorMessage: string = '';
  maxNumberPage: number = 1;
  receviedFilm: boolean = false;
  page: number = 1;
  filmId: string = '';
  saveMasive: any[] = [];
  api: string = environment.ApiTMDB

  searchProces: boolean = false;

  constructor(
    private filmsServiсe: FilmsService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {

      this.getFilmsByCategory();

    });

  }

  // Отримання Фільмів

  getFilmsByCategory(): void {
    
    this.searchProces = true;

    this.FilterByCategory();

    this.filmsServiсe.getAll(this.searchService.filmApi).subscribe(
      (data) => {

        this.films = data.results;

        if (data.total_pages > 500) {

          this.maxNumberPage = 500;

        } else {

          this.maxNumberPage = data.total_pages;

        }

        this.receviedFilm = true;
        this.searchProces = false;
        this.errorMessage = '';

        if (this.films.length == 0) {

          this.errorMessage = 'Not Found!';
          this.receviedFilm = false;

          setTimeout(() => {
            this.errorMessage = '';
          }, 2800);

        }
        
      },
      (error) => {

        this.errorMessage = 'Not Found';

        setTimeout(() => {
          this.errorMessage = '';
        }, 2800);

        this.receviedFilm = false;
        this.searchProces = false;

      }

    );
  }

  // Перехід на попередню сторінку

  prevPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      if (filterParams.page > 1) {

        const filterParsms = {
          category: filterParams.category,
          minYear: filterParams.minYear,
          maxYear: filterParams.maxYear,
          page: filterParams.page - 1,
          ganreFilme: filterParams.ganreFilme,
          ganreTv: filterParams.ganreTv,
        };

        this.page = filterParams.page - 1;

        localStorage.setItem('filterParams', JSON.stringify(filterParsms));

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

  }

  // Перехід на наступну сторінку

  nextPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      if (filterParams.page < this.maxNumberPage) {

        const filterParsms = {
          category: filterParams.category,
          minYear: filterParams.minYear,
          maxYear: filterParams.maxYear,
          page: filterParams.page + 1,
          ganreFilme: filterParams.ganreFilme,
          ganreTv: filterParams.ganreTv,
        };

        this.page = filterParams.page + 1;

        localStorage.setItem('filterParams', JSON.stringify(filterParsms));

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

  }

  // Пошук за номером сторінки

  enterPage(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      const filterParsms = {
        category: filterParams.category,
        minYear: filterParams.minYear,
        maxYear: filterParams.maxYear,
        page: this.page,
        ganreFilme: filterParams.ganreFilme,
        ganreTv: filterParams.ganreTv,
      };

      localStorage.setItem('filterParams', JSON.stringify(filterParsms));

      if (filterParsms.page > this.maxNumberPage) {

        const filterParsms = {
          category: filterParams.category,
          minYear: filterParams.minYear,
          maxYear: filterParams.maxYear,
          page: this.maxNumberPage,
          ganreFilme: filterParams.ganreFilme,
          ganreTv: filterParams.ganreTv,
        };

        localStorage.setItem('filterParams', JSON.stringify(filterParsms));
        this.getFilmsByCategory();
        this.page = this.maxNumberPage;

      } else if (filterParsms.page < 1) {

        const filterParsms = {
          category: filterParams.category,
          minYear: filterParams.minYear,
          maxYear: filterParams.maxYear,
          page: 1,
          ganreFilme: filterParams.ganreFilme,
          ganreTv: filterParams.ganreTv,
        };

        localStorage.setItem('filterParams', JSON.stringify(filterParsms));
        this.getFilmsByCategory();
        this.page = 1;

      } else {

        this.getFilmsByCategory();
        this.errorMessage = '';

      }

    }

  }

  // Фільтрування

  FilterByCategory(): void {

    let myApi = this.api;
    const apiKey = `?api_key=43bf190d6bcf679c19972989b9cb1774`;

    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      if (filterParams.category) {

        myApi = myApi + `discover/${filterParams.category}`;

      } else {

        myApi = myApi;

      }

      myApi = myApi + apiKey + `&page=${filterParams.page}`;

      if (filterParams.category == 'movie' && filterParams.ganreFilme) {

        myApi = myApi + `&with_genres=${filterParams.ganreFilme}`;

      }

      if (filterParams.category == 'tv' && filterParams.ganreTv) {

        myApi = myApi + `&with_genres=${filterParams.ganreTv}`;

      }

      if (
        filterParams.minYear == filterParams.maxYear &&
        filterParams.category == 'movie'
      ) {

        myApi = myApi + `&primary_release_year=${filterParams.minYear}`;

      } else if (
        filterParams.minYear !== filterParams.maxYear &&
        filterParams.category == 'movie'
      ) {

        myApi =
          myApi +
          `&primary_release_date.gte=${filterParams.minYear}-01-01&primary_release_date.lte=${filterParams.maxYear}-12-31`;

      }

      if (
        filterParams.minYear == filterParams.maxYear &&
        filterParams.category == 'tv'
      ) {

        myApi = myApi + `&first_air_date_year=${filterParams.minYear}`;

      } else if (
        filterParams.minYear !== filterParams.maxYear &&
        filterParams.category == 'tv'
      ) {

        myApi =
          myApi +
          `&first_air_date.gte=${filterParams.minYear}-01-01&first_air_date.lte=${filterParams.maxYear}-12-31`;

      }

      if (filterParams.category) {

        this.searchService.searchParams(myApi);

      } else {

        this.errorMessage = 'Please select a category';

        setTimeout(() => {
          this.errorMessage = this.errorMessage.replace(
            'Please select a category',
            ''
          );
        }, 2800);

      }

    }

  }

  // Отрмання id фільму для отримання докладної інформації

  getFilmId(id: number): void {
    
    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      let API;

      if (filterParams.category == 'movie') {

        API = `${this.api}movie/${id}/external_ids?api_key=43bf190d6bcf679c19972989b9cb1774`;

      } else {

        API = `${this.api}tv/${id}/external_ids?api_key=43bf190d6bcf679c19972989b9cb1774`;

      }

      let FilmId;

      this.filmsServiсe.getAll(API).subscribe((data) => {

        FilmId = data.imdb_id;
        this.router.navigate(['Information', FilmId]);

      });

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

    if (typeof window !== 'undefined' && window.localStorage) {

      const filterParamsLocal = localStorage.getItem('filterParams');

      const filterParams = filterParamsLocal
        ? JSON.parse(filterParamsLocal)
        : {};

      let API;
      let FilmId;

      if (filterParams.category == 'movie') {

        API = `${this.api}movie/${filmId}/external_ids?api_key=43bf190d6bcf679c19972989b9cb1774`;

      } else {

        API = `${this.api}tv/${filmId}/external_ids?api_key=43bf190d6bcf679c19972989b9cb1774`;

      }

      this.filmsServiсe.getAll(API).subscribe((data) => {

        FilmId = data.imdb_id;

        if (typeof localStorage !== 'undefined') {

          const getSaveFilm = localStorage.getItem('filmSaveInfo');

          if (getSaveFilm) {

            const getFilmInfo = JSON.parse(getSaveFilm);

            for (let filmInfo of getFilmInfo) {

              if (FilmId !== filmInfo.id) {

                this.saveMasive.push(filmInfo);

              }

            }

            alert(`${filmTitle} add to save`);

          }

        }

        const filmSaveInfo = {
          poster: 'https://image.tmdb.org/t/p/w500' + filmPoster,
          title: filmTitle,
          type: filmType,
          year: filmYear,
          id: FilmId,
        };

        this.saveMasive.push(filmSaveInfo);
        localStorage.setItem('filmSaveInfo', JSON.stringify(this.saveMasive));
        this.saveMasive = [];

      });

    }

  }
  
}
