/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserRecipesService } from './user-recipes.service';

describe('Service: UserRecipes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRecipesService]
    });
  });

  it('should ...', inject([UserRecipesService], (service: UserRecipesService) => {
    expect(service).toBeTruthy();
  }));
});
