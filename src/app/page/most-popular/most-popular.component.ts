import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-most-popular',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.css'],
})
export class MostPopularComponent {
  Highcharts: typeof Highcharts = Highcharts;

  filterBtnIMDb = [
    { name: 'IMDb Rating', isActive: true },
    { name: 'Number of rating', isActive: false },
  ];

  filterBtnBest2024 = [
    { name: 'Worldwide', isActive: true },
    { name: 'Domestic', isActive: false },
    { name: 'Foreign', isActive: false },
  ];

  filterAtive: string =
    'px-2 py-1 border-2 border-color-switching btn-active-switching';
  filterNoAtive: string =
    'px-2 py-1 border-2 border-color-switching btn-no-active-switching';

  filterUse: string = 'IMDb Rating';
  filter2024Use: string = 'Worldwide';

  // Фільтер для IMDb

  setActiveBtnIMDb(button: any) {
    for (let btn of this.filterBtnIMDb) {
      btn.isActive = false;
    }

    const scrollPosition = window.scrollY;

    button.isActive = true;
    this.fliterIMDb();

    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  }

  fliterIMDb() {
    for (let btn of this.filterBtnIMDb) {
      if (btn.isActive) {
        this.filterUse = btn.name;
      }
    }
  }

  // Popular Movies from IMDb (Rating)

  chartOptionsPopularMovies: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'rgba(240, 248, 255, 0)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Movies',
      style: {
        color: 'var(--color-text)',
      },
    },
    yAxis: {
      visible: false,
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      lineColor: 'var(--color-text)',
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
      categories: [
        'The Shawshank Redemption',
        'The Godfather',
        'The Dark Knight',
        'The Lord of the Rings: The Return of the King',
        "Schindler's List",
        '12 Angry Men',
        'The Godfather Part II',
        'The Lord of the Rings: The Fellowship of the Ring',
        'Original title: Pulp Fiction',
        '12th Fail',
      ],
    },
    plotOptions: {
      series: {
        borderRadius: 5,
      } as any,
    },
    series: [
      {
        type: 'bar',
        name: 'IMDb Rating',
        color: '#506ef9',
        data: [
          { y: 9.3 },
          { y: 9.2 },
          { y: 9 },
          { y: 9 },
          { y: 9 },
          { y: 9 },
          { y: 9 },
          { y: 8.9 },
          { y: 8.9 },
          { y: 8.9 },
        ],
      },
    ],
  };

  // Popular Movies from IMDb (Number of rating)

  chartOptionsNumberRatingMovies: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'rgba(240, 248, 255, 0)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Movies',
      style: {
        color: 'var(--color-text)',
      },
    },
    yAxis: {
      visible: false,
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      lineColor: 'var(--color-text)',
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
      categories: [
        'The Shawshank Redemption',
        'The Dark Knight',
        'Inception',
        'Fight Club',
        'Forrest Gump',
        'Pulp Fiction',
        'Interstellar',
        'The Matrix',
        'The Godfather',
        'The Fellowship of the Ring',
      ],
    },
    plotOptions: {
      series: {
        borderRadius: 5,
      } as any,
    },
    series: [
      {
        type: 'bar',
        name: 'Number of rating (Millions)',
        color: '#501ef9',
        data: [
          { y: 2.9 },
          { y: 2.9 },
          { y: 2.6 },
          { y: 2.4 },
          { y: 2.3 },
          { y: 2.3 },
          { y: 2.2 },
          { y: 2.1 },
          { y: 2 },
          { y: 2 },
        ],
      },
    ],
  };

  // Popular Serial from IMDb (Rating)

  chartOptionsPopularSerial: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'rgba(240, 248, 255, 0)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Serial',
      style: {
        color: 'var(--color-text)',
      },
    },
    yAxis: {
      visible: false,
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      lineColor: 'var(--color-text)',
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
      categories: [
        'Breaking Bad',
        'Planet Earth II',
        'Band of Brothers',
        'Planet Earth',
        'The Wire',
        'Chernobyl',
        'Avatar: The Last Airbender',
        'Bluey',
        'Our Planet',
        'Cosmos',
      ],
    },
    plotOptions: {
      series: {
        borderRadius: 5,
      } as any,
    },
    series: [
      {
        type: 'bar',
        name: 'IMDb Rating',
        color: '#506ef9',
        data: [
          { y: 9.5 },
          { y: 9.5 },
          { y: 9.4 },
          { y: 9.4 },
          { y: 9.3 },
          { y: 9.3 },
          { y: 9.3 },
          { y: 9.3 },
          { y: 9.3 },
          { y: 9.3 },
        ],
      },
    ],
  };

  // Popular Serial from IMDb (Number of rating)

  chartOptionsNumberRatingSerial: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'rgba(240, 248, 255, 0)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Serial',
      style: {
        color: 'var(--color-text)',
      },
    },
    yAxis: {
      visible: false,
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      lineColor: 'var(--color-text)',
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
      categories: [
        'Game of Thrones',
        'Breaking Bad',
        'Stranger Things',
        'Friends',
        'Friends',
        'Chernobyl',
        'Dexter',
        'The Office',
        'The Boys',
        'Better Call Saul',
      ],
    },
    plotOptions: {
      series: {
        borderRadius: 5,
      } as any,
    },
    series: [
      {
        type: 'bar',
        name: 'Number of rating (Millions)',
        color: '#501ef9',
        data: [
          { y: 2.3 },
          { y: 2.2 },
          { y: 1.4 },
          { y: 1.1 },
          { y: 1 },
          { y: 0.893 },
          { y: 0.792 },
          { y: 0.736 },
          { y: 0.721 },
          { y: 0.677 },
        ],
      },
    ],
  };

  // Best in 2024

  // Фільтер для Best in 2024

  setActiveBtnBestIn2024(button: any) {
    for (let btn of this.filterBtnBest2024) {
      btn.isActive = false;
    }

    const scrollPosition = window.scrollY;

    button.isActive = true;
    this.fliterBestIn2024();

    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  }

  fliterBestIn2024() {
    for (let btn of this.filterBtnBest2024) {
      if (btn.isActive) {
        this.filter2024Use = btn.name;
      }
    }
  }

  // Worldwid Rating

  chartOptionsWorldwid2024: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'rgba(240, 248, 255, 0)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Worldwid Rating',
      style: {
        color: 'var(--color-text)',
      },
    },
    yAxis: {
      visible: false,
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      lineColor: 'var(--color-text)',
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
      categories: [
        'Inside Out 2',
        'Deadpool & Wolverine',
        'Despicable Me 4',
        'Dune: Part Two',
        'Godzilla x Kong: The New Empire',
        'Kung Fu Panda 4',
        'Bad Boys: Ride or Die',
        'Kingdom of the Planet of the Apes',
        'Twisters',
        'Alien: Romulus',
      ],
    },
    plotOptions: {
      series: {
        borderRadius: 5,
      } as any,
    },
    series: [
      {
        type: 'bar',
        name: 'Earned funds in $',
        color: '#506ef9',
        data: [
          { y: 1682448108 },
          { y: 1306367727 },
          { y: 940804390 },
          { y: 711844358 },
          { y: 567650016 },
          { y: 548861517 },
          { y: 403655003 },
          { y: 397378150 },
          { y: 368943295 },
          { y: 331516724 },
        ],
      },
    ],
  };

  // Domestic Rating

  chartOptionsDomestic2024: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'rgba(240, 248, 255, 0)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Domestic Rating',
      style: {
        color: 'var(--color-text)',
      },
    },
    yAxis: {
      visible: false,
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      lineColor: 'var(--color-text)',
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
      categories: [
        'Inside Out 2',
        'Deadpool & Wolverine',
        'Despicable Me 4',
        'Dune: Part Two',
        'Godzilla x Kong: The New Empire',
        'Kung Fu Panda 4',
        'Bad Boys: Ride or Die',
        'Kingdom of the Planet of the Apes',
        'Twisters',
        'Alien: Romulus',
      ],
    },
    plotOptions: {
      series: {
        borderRadius: 5,
      } as any,
    },
    series: [
      {
        type: 'bar',
        name: 'Earned funds in $',
        color: '#506ef9',
        data: [
          { y: 652656715 },
          { y: 622525050 },
          { y: 359610390 },
          { y: 282144358 },
          { y: 196350016 },
          { y: 193590620 },
          { y: 193573217 },
          { y: 171130165 },
          { y: 266543295 },
          { y: 101842505 },
        ],
      },
    ],
  };
  // Foreign Rating

  chartOptionsForeign2024: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'rgba(240, 248, 255, 0)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Foreign Rating',
      style: {
        color: 'var(--color-text)',
      },
    },
    yAxis: {
      visible: false,
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      lineColor: 'var(--color-text)',
      labels: {
        style: {
          color: 'var(--color-text)',
        },
      },
      categories: [
        'Inside Out 2',
        'Deadpool & Wolverine',
        'Despicable Me 4',
        'Dune: Part Two',
        'Godzilla x Kong: The New Empire',
        'Kung Fu Panda 4',
        'Bad Boys: Ride or Die',
        'Kingdom of the Planet of the Apes',
        'Twisters',
        'Alien: Romulus',
      ],
    },
    plotOptions: {
      series: {
        borderRadius: 5,
      } as any,
    },
    series: [
      {
        type: 'bar',
        name: 'Earned funds in $',
        color: '#506ef9',
        data: [
          { y: 1029791393 },
          { y: 683842677 },
          { y: 581194000 },
          { y: 429700000 },
          { y: 371300000 },
          { y: 355270897 },
          { y: 210081786 },
          { y: 226247985 },
          { y: 102400000 },
          { y: 229674219 },
        ],
      },
    ],
  };
}
