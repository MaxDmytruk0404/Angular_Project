import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  filmName: string = '';
  filmCategory: string = '';
  filmPage: number = 1;
  filmApi: string = '';
  filmMinYear: number = 1900;
  filmMaxYear: number = 2024;
  filmGenre: string = '';
  tvGenre: string = '';

  filmFilterVisible: boolean = false;
  private filterVisibleSubject = new BehaviorSubject<boolean>(false);
  filterVisible$ = this.filterVisibleSubject.asObservable();
  darckMode: boolean = false;

  constructor() { }

  searchParams(api: string) {
    this.filmApi = api;
  }

  pagePrev(page: number) {
    this.filmPage = page - 1;
  }

  pageNext(page: number) {
    this.filmPage = page + 1;
  }

  enterPage(page: number) {
    this.filmPage = page;
  }

  filterVisibel(visibel: boolean) {
    this.filmFilterVisible = visibel;
    this.filterVisibleSubject.next(visibel);
  }

  darckModeFunction(darck: boolean) {
    this.darckMode = darck;
  }

  getServiseCatagory(category: string){
    this.filmCategory = category
  }

}
