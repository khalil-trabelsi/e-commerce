import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { authGuard } from './helpers/auth-guard';
import { loginGuard } from './helpers/login.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmationEmailComponent } from './auth/confirmation-email/confirmation-email.component';
import { ConfirmationEmailNotificationComponent } from './auth/confirmation-email-notification/confirmation-email-notification.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [loginGuard]
  }, 
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'confirmation/:token',
    component: ConfirmationEmailComponent
  },
  {
    path: 'register/confirmation',
    component: ConfirmationEmailNotificationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: []
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canMatch: [authGuard],
    data: {roles: ['ADMIN', 'MODERATOR']},
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'page-not-found',
    component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
