import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FilmsComponent } from './page//films/films.component';
import { FilmsSaveComponent } from './page/films-save/films-save.component';
import { LoginComponent } from './page/login/login.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { FilmInfoComponent } from './page/film-info/film-info.component';
import { MostPopularComponent } from './page/most-popular/most-popular.component';
import { HomeComponent } from './page/home/home.component';
import { FilterFilmsCatalogComponent } from './page/filter-films-catalog/filter-films-catalog.component';
import { UserInfoComponent } from './page/user-info/user-info.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { CheckEmailComponent } from './page/check-email/check-email.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'FilmCatalog',
        component: FilmsComponent
    },
    {
        path: 'CategoryFilmCatalog',
        component: FilterFilmsCatalogComponent
    },
    {
        path: 'MySaves',
        component: FilmsSaveComponent
    },
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'Registration',
        component: RegistrationComponent
    },
    {
        path: 'Information/:id',
        component: FilmInfoComponent
    },
    {
        path: 'FilmCatalog/Information/:id',
        component: FilmInfoComponent
    },
    {
        path: 'Popular',
        component: MostPopularComponent
    },
    {
        path: 'Profile',
        component: UserInfoComponent
    },
    {
        path: 'ForgotPassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'EmailVerify',
        component: VerifyEmailComponent
    },
    {
        path: 'EmailSent',
        component: CheckEmailComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }