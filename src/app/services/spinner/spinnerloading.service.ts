import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SpinnerloadingService {
  spinnerSubject= new Subject<any>()
  isViewSpinnerObservable= this.spinnerSubject.asObservable()
  constructor() { }
  isViewSpinner(isView:Boolean){
    this.spinnerSubject.next(isView)
  }
}
