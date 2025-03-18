import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'user-recipes',
    loadChildren: () =>
      import('./user-recipes/user-recipes.module').then(
        (m) => m.UserRecipesModule
      ),
  },
  { path: 'fav-recipes', loadChildren: () => import('./fav-recipes/fav-recipes.module').then(m => m.FavRecipesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
