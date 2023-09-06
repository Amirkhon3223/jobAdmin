import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// layouts
import {AdminComponent} from './layouts/admin/admin.component';
import {AuthComponent} from './layouts/auth/auth.component';

// admin views
import {DashboardComponent} from './views/admin/dashboard/dashboard.component';
import {SettingsComponent} from './views/admin/settings/settings.component';
import {TablesComponent} from './views/admin/tables/tables.component';

// auth views
import {LoginComponent} from './views/auth/login/login.component';
import {RegisterComponent} from './views/auth/register/register.component';
import {EditVacancyComponent} from "./components/edit-vacancy/edit-vacancy.component";
import {VacancyListComponent} from "./components/cards/card-vacancy-list/vacancy-list.component";
import {ContentHeadingComponent} from "./components/content-heading/content-heading.component";
import {ContentListComponent} from "./components/content-list/content-list.component";
import {VacancyReviewComponent} from "./views/admin/vacancy-review/vacancy-review.component";
import {NgForOf} from "@angular/common";
import {PostVacancyComponent} from "./components/cards/post-vacancy/post-vacancy.component";

const routes: Routes = [
  // admin views
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'tables', component: TablesComponent},
      {path: '', redirectTo: 'admin/dashboard', pathMatch: 'full'},
    ],
  },
  {path: 'vacancy/:id', component: VacancyReviewComponent},
  {path: 'vacancy/edit/:id', component: EditVacancyComponent}, // Маршрут для редактирования

  // auth views
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
    ],
  },
  {path: '', component: AdminComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgForOf],
  exports: [RouterModule, ContentHeadingComponent, ContentListComponent],
  declarations: [
    ContentHeadingComponent,
    ContentListComponent
  ]
})
export class AppRoutingModule {

}
