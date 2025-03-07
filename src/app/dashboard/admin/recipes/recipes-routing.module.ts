import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'recipesList', pathMatch: 'full'},
  { path: '', component: RecipesComponent },

  { path: 'recipesList', component: RecipesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
