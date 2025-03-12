import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';

const routes: Routes = [ { path: '', redirectTo: 'categoriesList', pathMatch: 'full' },
  { path: 'categoriesList', component: CategoriesListComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
