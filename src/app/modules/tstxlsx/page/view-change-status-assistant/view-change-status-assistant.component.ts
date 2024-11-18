import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { UsersService } from './../../../../services/users/users.service'
import { AlertDialogService } from '../../../../services/alertdialog/alert-dialog.service';
import { SpinnerloadingService } from '../../../../services/spinner/spinnerloading.service';

@Component({
  selector: 'app-view-change-status-assistant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-change-status-assistant.component.html',
  styleUrl: './view-change-status-assistant.component.css'
})
export class ViewChangeStatusAssistantComponent {
 @ViewChild("meemailassistant", { static: true }) meInputAssistantEmail!:ElementRef<any>
 @ViewChild("metokenassistant", { static: true }) meInputAssistantToken!:ElementRef<any>
 alertDialogService:AlertDialogService=inject(AlertDialogService)
 @Input("nomStatus") typeNom:String="Ingreso"; 
 @Input("statusType") statusAssistant:Number=2;
 @Input("needToken") needToken:Boolean=false;
 spinnerloadingService:SpinnerloadingService=inject(SpinnerloadingService)
 private meLetterToken:String="";
 private userService:UsersService=inject(UsersService)
 getTypeStatus(typeNom:String, status:Number){
  this.typeNom= typeNom;
  this.statusAssistant= status;
 }  
 updateAssinstantUserSetStatus(){
  let tokenEvent= localStorage.getItem("tokenevent")
  if(!tokenEvent){
    console.log("Ojo no tiene token, mejor suba una base de datos")
    this.alertDialogService.sendSubjectViewAlertDialog({
      name: 'Error token',
      description: "Ojo no tiene token, mejor suba una base de datos",
      colortype: "red-500-tst"
    })
    return
  }
  let domEmail= this.meInputAssistantEmail.nativeElement
  let email= domEmail.value
  //let domToken= this.meInputAssistantToken.nativeElement
  //let token= domToken.value
  if(email.length <  6 && !email.includes("@")){
    console.log("Debe colocar un correo para poder validarlo")
    this.alertDialogService.sendSubjectViewAlertDialog({
      name: 'Error token',
      description: "Debe colocar un correo para poder validarlo",
      colortype: "red-500-tst"
    })
    return
  }
  email= email.trim()
  //if(this.needToken && token.length < 3){
  if(!this.meLetterToken || this.meLetterToken.length < 3){  
    console.log("Debe colocar un token para poder validarlo")
    this.alertDialogService.sendSubjectViewAlertDialog({
      name: 'Error token',
      description: "Debe colocar un token para poder validarlo",
      colortype: "red-500-tst"
    })
    return
  }
  //this.userService.updateStatusUserAssistant(email, tokenEvent, this.statusAssistant, Boolean(true), token)
  this.spinnerloadingService.isViewSpinner(true)
  this.userService.updateStatusUserAssistant(email, tokenEvent, this.statusAssistant, this.needToken, this.meLetterToken)
  .subscribe(r => {
    if(!r.updated){
     this.spinnerloadingService.isViewSpinner(false) 
     this.alertDialogService.sendSubjectViewAlertDialog({
       name: 'Cambio estado',
       description: r.description,
       colortype: "red-500-tst"
     })
     return  
    }
    this.spinnerloadingService.isViewSpinner(false)
    this.alertDialogService.sendSubjectViewAlertDialog({
      name: 'Cambio estado',
      description: r.description,
      colortype: "green-500-tst"
    })
  })
  //this.meLetterToken= "";
  console.log("loaded!!!....")
 }
 refreshTokenAssistant(letter:any){
  let letterString= letter.target.value
  // console.log("letterString: ")
  // console.log(letterString)
  //this.meLetterToken = this.meLetterToken.concat(letterString)
  this.meLetterToken = letterString;
 }
}
