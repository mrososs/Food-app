import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '', // Parent route
    component: AuthComponent, // Wrapper component
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }, // Child route
      { path: '', redirectTo: 'register', pathMatch: 'full' }, // Default child route
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
