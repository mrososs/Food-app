import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard, authGuard } from './core/guards/auth.guard';
import { ProfileUserComponent } from './shared/components/profile-user/profile-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [authGuard],
  },
  {
    path: 'profilePage',
    component: ProfileUserComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
