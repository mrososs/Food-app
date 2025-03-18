/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavRecipesService } from './fav-recipes.service';

describe('Service: FavRecipes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavRecipesService]
    });
  });

  it('should ...', inject([FavRecipesService], (service: FavRecipesService) => {
    expect(service).toBeTruthy();
  }));
});
