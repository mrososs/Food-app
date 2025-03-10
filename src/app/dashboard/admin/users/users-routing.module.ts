import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'usersList', pathMatch: 'full' },
  { path: 'usersList', component: UsersListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
