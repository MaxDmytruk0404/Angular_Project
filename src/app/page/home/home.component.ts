import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterLink } from '@angular/router';
import { SearchComponent } from '../../page-component/search/search.component';
import { FormsModule } from '@angular/forms';
import { HomeFilterComponent } from '../../page-component/home-filter/home-filter.component';
import { SearchService } from '../../service/search/search.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterLink,
    SearchComponent,
    FormsModule,
    HomeFilterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  
  errorMessage: string = '';
  message: string = '';
  saveMasive: any[] = [];

  slidesBestIn2024: any = [
    {
      name: 'Inside Out 2',
      img: 'assets/Inside_Out_2.jpg',
      id: 'tt22022452',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Deadpool & Wolverine',
      img: 'assets/Deadpool_&_Wolverine.jpg',
      id: 'tt6263850',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Despicable Me 4',
      img: 'assets/Despicable_Me_4.jpg',
      id: 'tt7510222',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Dune: Part Two',
      img: 'assets/Dune_Part_Two.jpg',
      id: 'tt15239678',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Godzilla x Kong: The New Empire',
      img: 'assets/Godzilla_x_Kong_The_New_Empire.jpg',
      id: 'tt14539740',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Kung Fu Panda 4',
      img: 'assets/Kung_Fu_Panda_4.jpg',
      id: 'tt21692408',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Bad Boys: Ride or Die',
      img: 'assets/Bad_Boys_Ride_or_Die.jpg',
      id: 'tt4919268',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Kingdom of the Planet of the Apes',
      img: 'assets/Kingdom_of_the_Planet_of_the_Apes.jpg',
      id: 'tt11389872',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Twisters',
      img: 'assets/Twisters.jpg',
      id: 'tt12584954',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Alien: Romulus',
      img: 'assets/Alien_Romulus.jpg',
      id: 'tt18412256',
      type: 'movie',
      year: '2024',
    },
  ];

  slidesRecomend: any = [
    {
      name: 'Avengers: Infinity War',
      img: 'assets/Avengers_Infinity_War.jpg',
      id: 'tt4154756',
      type: 'movie',
      year: '2018',
    },
    {
      name: 'Fallout',
      img: 'assets/Fallout.jpg',
      id: 'tt12637874',
      type: 'series',
      year: '2024-',
    },
    {
      name: 'Godzilla x Kong: The New Empire',
      img: 'assets/Godzilla_x_Kong_The_New_Empire.jpg',
      id: 'tt14539740',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'The Boys',
      img: 'assets/The_Boys.jpg',
      id: 'tt1190634',
      type: 'series',
      year: '2019-',
    },
    {
      name: 'The Mandalorian',
      img: 'assets/The_Mandalorian.jpg',
      id: 'tt8111088',
      type: 'series',
      year: '2019-',
    },
    {
      name: 'Gladiator',
      img: 'assets/Gladiator.jpg',
      id: 'tt0172495',
      type: 'movie',
      year: '2000',
    },
    {
      name: 'Dune: Part Two',
      img: 'assets/Dune_Part_Two.jpg',
      id: 'tt15239678',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'The Grand Tour',
      img: 'assets/The_Grand_Tour.jpg',
      id: 'tt5712554',
      type: 'series',
      year: '2016-2024',
    },
    {
      name: 'Alien: Romulus',
      img: 'assets/Alien_Romulus.jpg',
      id: 'tt18412256',
      type: 'movie',
      year: '2024',
    },
    {
      name: 'Deadpool & Wolverine',
      img: 'assets/Deadpool_&_Wolverine.jpg',
      id: 'tt6263850',
      type: 'movie',
      year: '2024',
    },
  ];

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {

    this.searchService.filterVisibel(false);

    // registration complite message

    if (typeof window !== 'undefined' && window.localStorage) {

      const localMessage = localStorage.getItem('message') || '';

      if (localMessage !== '') {

        this.message = localMessage;

        setTimeout(() => {
          this.message = this.message.replace(localMessage, '');
        }, 2800);

        localStorage.setItem('message', '');

      }
    }
  }

  // Кнопка збереження фільмів

  saveFilm(
    img: string,
    name: string,
    type: string,
    year: string,
    id: string
  ): void {

    if (typeof localStorage !== 'undefined') {

      const getSaveFilm = localStorage.getItem('filmSaveInfo');

      if (getSaveFilm) {

        const getFilmInfo = JSON.parse(getSaveFilm);

        for (let filmInfo of getFilmInfo) {

          if (id !== filmInfo.id) {

            this.saveMasive.push(filmInfo);

          }

        }

        alert(`${name} add to save`);

      }

    }

    const filmSaveInfo = {
      poster: img,
      title: name,
      type: type,
      year: year,
      id: id,
    };

    this.saveMasive.push(filmSaveInfo);
    localStorage.setItem('filmSaveInfo', JSON.stringify(this.saveMasive));
    this.saveMasive = [];

  }
}
