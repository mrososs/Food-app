import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRecipesRoutingModule } from './user-recipes-routing.module';
import { UserRecipesComponent } from './user-recipes.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [UserRecipesComponent],
  imports: [CommonModule, UserRecipesRoutingModule, SharedModule],
})
export class UserRecipesModule {}
