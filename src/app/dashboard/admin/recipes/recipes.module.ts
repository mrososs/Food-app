import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
