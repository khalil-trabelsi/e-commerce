import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {provideNativeDateAdapter} from '@angular/material/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './helpers/http-interceptor.service';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomGridActionComponent } from './admin/custom-grid-action/custom-grid-action.component';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgMaterialModule } from './ag-material/ag-material.module';
import { DatePickerFormatDirective } from './directives/date-picker-format.directive';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorDialogComponent,
    SpinnerComponent,
    ProfileComponent,
    CustomGridActionComponent,
    ConfirmDialogComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    DatePickerFormatDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgMaterialModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
