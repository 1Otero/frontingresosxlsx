import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Typealert } from '../../interfaces/typealert/typealert';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {
  subjectViewAlertDialog=new Subject<Typealert>()
  asObservableAlertDialog= this.subjectViewAlertDialog.asObservable()
  constructor() {}
  sendSubjectViewAlertDialog(data:Typealert){
   this.subjectViewAlertDialog.next(data)
  }
}
