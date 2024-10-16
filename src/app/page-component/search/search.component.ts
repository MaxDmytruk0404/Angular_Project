import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../service/search/search.service';
import { Router, RouterLink } from '@angular/router';
import { FilmsService } from '../../service/films/films.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})

export class SearchComponent implements OnInit{

  filmName: string = '';
  filmYear: string = 'all';
  page: number = 1;
  category: string = 'all';

  errorMessage: string = '';

  isHovered: boolean[] = [];

  // Фільтри

  filterBtns = [
    { text: 'All', name: 'all', isActive: true },
    { text: 'Movie', name: 'movie', isActive: false },
    { text: 'Series', name: 'series', isActive: false },
  ];

  filterVisible: boolean = false;
  filterParamVisible: boolean = false;
  smFilter: boolean = false;

  filterAtive: string =
    'px-2 py-1 border-2 border-color-switching btn-active-switching';
  filterNoAtive: string =
    'px-2 py-1 border-2 border-color-switching btn-no-active-switching';

  serchWindowVisble: boolean = false;
  timeout: any;
  films: any;
  filmsVisiabel: any = [];
  receviedFilm: boolean = false;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private filmsServiсe: FilmsService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.isHovered = new Array(this.filmsVisiabel.length).fill(false);

  }

  ngOnInit(): void {

    this.filterVisible = this.searchService.filmFilterVisible;
    
    this.searchService.filterVisible$.subscribe(value => {

        this.filterVisible = value;

    });

    if (typeof window !== 'undefined' && window.localStorage) {

      this.cheackActiveBtn();

    }
}

  // Функції input пошуку

  onBlur(event: FocusEvent): void {

    const target = event.relatedTarget as HTMLElement;

    if (!target || !target.closest('.search-result')) {

      this.serchWindowVisble = false;
      this.removeDarcnes();

    }

  }

  onKeyUp(event: KeyboardEvent): void {

    const inputElement = event.target as HTMLInputElement;
    const text = inputElement.value.trim();

    if (event.target as HTMLInputElement) {

      this.serchWindowVisble = text.length > 2;

    }

    if (this.serchWindowVisble) {

      this.getFilmsInformation(text);

    }

    this.getDarcnes();

  }


  search(): void {

    if (this.filmName.length < 3) {

      this.errorMessage = 'The number of characters must be greater than 3!';

      setTimeout(() => {
        this.errorMessage = this.errorMessage.replace(
          'The number of characters must be greater than 3!',
          ''
        );
      }, 2800);

      return;

    }

    const serchParams = {
      name: this.filmName,
      category: this.category,
      page: this.page
    };

    localStorage.setItem('searchParams', JSON.stringify(serchParams));
    
    this.router.navigate(['FilmCatalog', { refresh: new Date().getTime() }]);

  }

  // Функція отримання даних з api

  getFilmsInformation(text: string): void {

    let filmApi;
    filmApi = `https://www.omdbapi.com/?s=${text}&page=1&apikey=aae28dc3`;

    this.filmsServiсe.getAll(filmApi).subscribe((data) => {

      this.films = data.Search;
      this.filmsVisiabel = this.films ? this.films.slice(0, 3) : [];

      if (this.films) {

        this.receviedFilm = true;

      } else {

        this.receviedFilm = false;

      }

    });

  }

  // Затемнення при пошуку

  getDarcnes(): void {

    const theme = this.document.body.getAttribute('data-theme');

    if (theme == 'night') {

      this.renderer.setAttribute(
        this.document.body,
        'data-theme',
        'nightDarkening'
      );

    } else if (theme == 'day') {

      this.renderer.setAttribute(
        this.document.body,
        'data-theme',
        'dayDarkening'
      );

    }

  }

  // Зникнення затемнення при пошуку

  removeDarcnes(): void {

    const theme = this.document.body.getAttribute('data-theme');

    if (theme == 'nightDarkening') {

      this.renderer.setAttribute(this.document.body, 'data-theme', 'night');

    } else if (theme == 'dayDarkening') {

      this.renderer.setAttribute(this.document.body, 'data-theme', 'day');

    }

  }

  // Отримання постера при пошуку

  getSerchFilmPoster(poster: string) {

    if(poster === 'N/A'){

      return 'assets/notFound.jpg';

    } else {

      return poster;

    }

  }

  // Hover для назв фільмів в пошуковій системі

  onHover(index: number, state: boolean): void {

    this.isHovered[index] = state;
    
  }

  // Активні кнопки на фільтрові

  setActiveBtnIMDb(button: any): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      for (let btn of this.filterBtns) {
        btn.isActive = false;
      }
  
      button.isActive = true;
  
      this.category = button.name;
  
      const serchParamsLocal = localStorage.getItem('searchParams');
      
      const searchParams = serchParamsLocal ? JSON.parse(serchParamsLocal) : {};
  
  
      const newserchParams = {
        name: searchParams.name,
        category: this.category,
        page: this.page
      };
  
      localStorage.setItem('searchParams', JSON.stringify(newserchParams));
  
      this.router.navigate(['FilmCatalog', { refresh: new Date().getTime() }]);
    }

  }

  // Активна кнопка фільтра

  cheackActiveBtn(): void {

    const serchParamsLocal = localStorage.getItem('searchParams'); 
    const searchParams = serchParamsLocal ? JSON.parse(serchParamsLocal) : {};

    for(let button of this.filterBtns){

      if (button.name == searchParams.category){

        button.isActive = true;

      } else {

        button.isActive = false;

      }

    }

  }

  
}
