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
import {VacancyReviewComponent} from "./views/admin/vacancy-review/vacancy-review.component";
import {NgForOf} from "@angular/common";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  // admin views
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard], // Применить AuthGuard ко всем admin-маршрутам
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'tables', component: TablesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {path: 'vacancy/:id', component: VacancyReviewComponent},

  // auth views
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' }, // По умолчанию перенаправляем на админскую панель
  { path: '**', redirectTo: 'admin/dashboard', pathMatch: 'full' }, // В случае неверного маршрута также перенаправляем на админскую панель
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgForOf],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {

}
