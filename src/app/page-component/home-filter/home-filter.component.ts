import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../../service/search/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-filter.component.html',
  styleUrl: './home-filter.component.css',
})

export class HomeFilterComponent {

  filterMinYear: number = 1900;
  filterMaxYear: number = 2024;
  filterCategory: string = '';
  page = 1

  errorMessage: string = '';

  selectedFilmGanre: string = '';
  selectedTvGanre: string = '';

  filterAtive: string =
    'px-2 py-1 border-2 border-color-switching btn-active-switching';
  filterNoAtive: string =
    'px-2 py-1 border-2 border-color-switching btn-no-active-switching';

  filterBtnsType = [
    { text: 'Movie', name: 'movie', isActive: false },
    { text: 'TV Shows', name: 'tv', isActive: false },
  ];

  tvGenre = [
    {
      id: 10759,
      name: "Action & Adventure"
    },
    {
      id: 16,
      name: "Animation"
    },
    {
      id: 35,
      name: "Comedy"
    },
    {
      id: 80,
      name: "Krimi"
    },
    {
      id: 99,
      name: "Dokumentarfilm"
    },
    {
      id: 18,
      name: "Drama"
    },
    {
      id: 10751,
      name: "Familie"
    },
    {
      id: 10762,
      name: "Kids"
    },
    {
      id: 9648,
      name: "Mystery"
    },
    {
      id: 10763,
      name: "News"
    },
    {
      id: 10764,
      name: "Reality"
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy"
    },
    {
      id: 10766,
      name: "Soap"
    },
    {
      id: 10767,
      name: "Talk"
    },
    {
      id: 10768,
      name: "War & Politics"
    },
    {
      id: 37,
      name: "Western"
    }
  ];

  filmGenre = [
    {
      id: 28,
      name: "Action"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 16,
      name: "Animation"
    },
    {
      id: 35,
      name: "Comedy"
    },
    {
      id: 80,
      name: "Crime"
    },
    {
      id: 99,
      name: "Documentary"
    },
    {
      id: 18,
      name: "Drama"
    },
    {
      id: 10751,
      name: "Family"
    },
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 36,
      name: "History"
    },
    {
      id: 27,
      name: "Horror"
    },
    {
      id: 10402,
      name: "Music"
    },
    {
      id: 9648,
      name: "Mystery"
    },
    {
      id: 878,
      name: "Science Fiction"
    },
    {
      id: 10770,
      name: "TV Movie"
    },
    {
      id: 53,
      name: "Thriller"
    },
    {
      id: 10749,
      name: "Romance"
    },
    {
      id: 37,
      name: "Western"
    }
  ]

  constructor (
    private searchService: SearchService,
    private router: Router,
  ) {}

  // Функція для фільтра (активна кнопка)

  setActiveBtn(button: any): void {

    for (let btn of this.filterBtnsType) {

      btn.isActive = false;

    }

    button.isActive = true;

    this.filterCategory = button.name;

  }

  // Вибір жанрів

  onCheckboxFilmChange(event: any, genre: string): void {

    if (event.target.checked) {

      if (this.selectedFilmGanre) {

        this.selectedFilmGanre += ',' + genre;

      } else {

        this.selectedFilmGanre = genre;

      }

    } else {

      const genresArray = this.selectedFilmGanre.split(',').filter(item => item !== genre);
      this.selectedFilmGanre = genresArray.join(',');

    }

  }

  onCheckboxTvChange(event: any, genre: string): void {

    if (event.target.checked) {

      if (this.selectedTvGanre) {

        this.selectedTvGanre += ',' + genre;

      } else {

        this.selectedTvGanre = genre;

      }
      
    } else {

      const genresArray = this.selectedTvGanre.split(',').filter(item => item !== genre);
      this.selectedTvGanre = genresArray.join(',');

    }
  }

  // Пошук за фільтром

  FilterByCategory(): void {

    this.searchService.getServiseCatagory(this.filterCategory);

    const filterParsms =  {
      category: this.filterCategory,
      minYear: this.filterMinYear,
      maxYear: this.filterMaxYear,
      page: this.page,
      ganreFilme: this.selectedFilmGanre,
      ganreTv: this.selectedTvGanre
    }

    localStorage.setItem('filterParams', JSON.stringify(filterParsms))

    let myApi = 'https://api.themoviedb.org/3/';

    if (this.searchService.filmCategory) {

      this.searchService.searchParams(myApi);
      this.router.navigate(['CategoryFilmCatalog', { refresh: new Date().getTime() }]);

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

  // Перевірка на правельне введення років в input 

  checkCorectingInputMinYear(): void {

    if (this.filterMinYear < 1900) {

      this.filterMinYear = 1900;

    } else if (this.filterMinYear > 2024) {

      this.filterMinYear = 2024;

    } else {

      this.filterMinYear = this.filterMinYear;

    }

    this.checkCorectingInputs()

  }

  // перевірка на максимальне введене значення року

  checkCorectingInputMaxYear(): void {

    if (this.filterMaxYear > 2024) {

      this.filterMaxYear = 2024;

    } else if (this.filterMaxYear < 1900) {

      this.filterMaxYear = 1900;

    } else {

      this.filterMaxYear = this.filterMaxYear;

    }

    this.checkCorectingInputs()

  }

  // Перевірка на корекнтість введення років

  checkCorectingInputs(): void {

    if (this.filterMinYear > this.filterMaxYear) {

      if (this.filterMaxYear == 1900){

        this.filterMinYear == 1900;

      } else {

        this.filterMinYear = this.filterMaxYear;

      }

    } else if (this.filterMaxYear < this.filterMinYear) {

      if (this.filterMinYear == 2024) {

        this.filterMaxYear == 2024;

      } else {

        this.filterMaxYear = this.filterMinYear;

      }

    } else {

      this.filterMaxYear == this.filterMaxYear;
      this.filterMinYear = this.filterMinYear;

    }
    
  }

}

