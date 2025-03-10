/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersListService } from './usersList.service';

describe('Service: UsersList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersListService]
    });
  });

  it('should ...', inject([UsersListService], (service: UsersListService) => {
    expect(service).toBeTruthy();
  }));
});
