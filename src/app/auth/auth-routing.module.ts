import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '', // Parent route
    component: AuthComponent, // Wrapper component
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }, // Child route
      {path:'forgetPassword',component:ForgetPasswordComponent},
      {path:'verifyAccount',component:VerifyAccountComponent},
      {path:'resetPassword',component:ResetPasswordComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default child route
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
