import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavRecipesRoutingModule } from './fav-recipes-routing.module';
import { FavRecipesComponent } from './fav-recipes.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [FavRecipesComponent],
  imports: [CommonModule, FavRecipesRoutingModule, SharedModule],
})
export class FavRecipesModule {}
