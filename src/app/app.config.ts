import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  
    provideHttpClient(withFetch()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ]
};
