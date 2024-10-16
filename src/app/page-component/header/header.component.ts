import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../service/search/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent implements OnInit {
  
  userFound: string = '';
  colorFon: string = 'night';

  constructor(
    private renderer: Renderer2,
    private searchService: SearchService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {

    this.getUser();
    this.renderer.setAttribute(this.document.body, 'data-theme', this.colorFon);

  }

  // Перевірка на вхід

  getUser(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const userFoundIn = localStorage.getItem('logged') || '';

      if (userFoundIn !== '') {

        this.userFound = 'true';

      } else {

        this.userFound = '';

      }

    }

  }

  // Світла тема

  getDay() {

    this.colorFon = 'day';
    this.renderer.setAttribute(this.document.body, 'data-theme', this.colorFon);

  }

  // Темна тема

  getNight() {

    this.colorFon = 'night';
    this.renderer.setAttribute(this.document.body, 'data-theme', this.colorFon);

  }

  // Перезапуск сторінки

  reload() {

    document.location.reload()

  }

  // Видимість фільтра

  filterVisibelNone(){

    this.searchService.filterVisibel(false)

  }
}
