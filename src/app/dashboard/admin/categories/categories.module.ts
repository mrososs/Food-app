import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';

@NgModule({
  declarations: [CategoriesComponent, CategoriesListComponent],
  imports: [CommonModule, SharedModule, CategoriesRoutingModule],
})
export class CategoriesModule {}
