import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {BrowserModule} from '@angular/platform-browser';

// layouts
import {AdminComponent} from './layouts/admin/admin.component';

import {AuthComponent} from './layouts/auth/auth.component';

// admin views
import {DashboardComponent} from './views/admin/dashboard/dashboard.component';
import {SettingsComponent} from './views/admin/settings/settings.component';

import {TablesComponent} from './views/admin/tables/tables.component';

// auth views
import {LoginComponent} from './views/auth/login/login.component';

// components for views and layouts
import {AdminNavbarComponent} from './components/navbars/admin-navbar/admin-navbar.component';
import {CardTableComponent} from './components/cards/card-table/card-table.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {UserDropdownComponent} from './components/dropdowns/user-dropdown/user-dropdown.component';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import {VacancyListComponent} from './components/cards/card-vacancy-list/vacancy-list.component';
import {HttpClientModule} from '@angular/common/http';
import {VacancyReviewComponent} from './views/admin/vacancy-review/vacancy-review.component';
import {EditVacancyComponent} from './components/edit-vacancy/edit-vacancy.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PostVacancyComponent} from './components/cards/post-vacancy/post-vacancy.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {PaginationComponent} from './components/pagination/pagination.component';
import {ProfileComponent} from './views/admin/profile/profile.component';
import {RequestViewComponent} from './views/admin/request-view/request-view.component';
import {FooterAdminComponent} from './components/footers/footer-admin/footer-admin.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterAdminComponent,
    CardTableComponent,
    AdminNavbarComponent,
    AdminComponent,
    AuthComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    VacancyListComponent,
    VacancyReviewComponent,
    EditVacancyComponent,
    PostVacancyComponent,
    PaginationComponent,
    ProfileComponent,
    RequestViewComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    // HotToastModule.forRoot({
    //   reverseOrder: true,
    //   dismissible: true,
    //   autoClose: true,
    // }),
  ],
  providers: []
})
export class AppModule {
}
