import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilmInfoService } from '../../service/film-info/film-info.service';

@Component({
  selector: 'app-film-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-info.component.html',
  styleUrl: './film-info.component.css',
})

export class FilmInfoComponent implements OnInit {
  
  filmId: string = '';
  filmInfo: any;

  constructor(
    private route: ActivatedRoute,
    private FilmInfoService: FilmInfoService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {

      this.filmId = params.get('id') ?? '';

    });

    this.getFilmInfo();

  }

  // Отримання фінформації про фільмів

  getFilmInfo(): void {

    this.FilmInfoService.getFilmInfo(this.filmId).subscribe((data) => {

      this.filmInfo = data;

    });

  }

}
