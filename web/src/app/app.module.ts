import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ProfileLogoComponent} from './common/profile-logo/profile-logo.component';
import {TokenService} from './_services/token.service';
import {AuthService} from './_services/auth.service';
import {AlertService} from './_services/alert.service';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AddComponent} from './unions/add/add.component';
import {MatOptionModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {TokenInterceptorProvider} from './_interceptors/token.interceptor';
import {HttpErrorInterceptorProvider} from './_interceptors/http-error.interceptor';
import {ApplyTokenComponent} from './common/apply-token/apply-token.component';
import {AboutComponent} from './about/about.component';
import {SingleComponent} from './unions/single/single.component';
import {MyComponent} from './unions/my/my.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ApplyTokenComponent,
    ProfileLogoComponent,
    AboutComponent,
    SingleComponent,
    MyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    TokenService,
    AuthService,
    AlertService,
    TokenInterceptorProvider,
    HttpErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
