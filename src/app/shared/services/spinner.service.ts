import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
private loadingSubject = new BehaviorSubject  < boolean > (false);
isLoading$ = this.loadingSubject.asObservable();

constructor() { }
show(){
    this.loadingSubject.next(true);
}
hide(){
  this.loadingSubject.next(false);
}

}
