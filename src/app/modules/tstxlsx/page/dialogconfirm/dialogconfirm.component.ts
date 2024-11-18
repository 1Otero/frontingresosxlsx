import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogconfirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialogconfirm.component.html',
  styleUrl: './dialogconfirm.component.css'
})
export class DialogconfirmComponent {
  @Input("options") meOptions!:any[]
  @Input("title") meTitle!:String;
  @Input("description") meDescription!:String;
  @Input("meViewSecondQuestion") viewSecondQuestion!:Boolean
 constructor(@Inject(MAT_DIALOG_DATA) data:any, public matDialog:MatDialogRef<DialogconfirmComponent>){
  if(data){
    this.meOptions= data.options
    this.meTitle= data.title
    this.meDescription= data.description
    this.viewSecondQuestion= data.viewSecondQuestion
  }
 }
 closeMeComponentDialog(opcion:string){
  if(!this.viewSecondQuestion){
    this.matDialog.close({opcion, optionType: 1})
    return
  }
  this.matDialog.close({opcion, optionType: 2})
 }
 selectedOpcion(opcion:string){
  this.closeMeComponentDialog(opcion)
 }
}
