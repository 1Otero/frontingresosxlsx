import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Typealert } from '../../../interfaces/typealert/typealert';
import { AlertDialogService } from '../../../services/alertdialog/alert-dialog.service';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent implements OnInit{
 isView:Boolean=true;
 bodyAlert!:Typealert;
 alertDialogService:AlertDialogService=inject(AlertDialogService)
 ngOnInit():void{
  this.alertDialogService
  .asObservableAlertDialog
  .subscribe((e) => {
    this.bodyAlert= e
    this.isView= true
    setTimeout(() => {
      this.isView=false;
    }, 2000)
  })    
 }
}
