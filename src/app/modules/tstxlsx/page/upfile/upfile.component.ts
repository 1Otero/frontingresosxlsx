import { Component, ElementRef, inject, Output, ViewChild, EventEmitter } from '@angular/core';
import { UpfileService } from '../../../../services/upfile/upfile.service';
import { MatDialog } from '@angular/material/dialog'
import { DialogconfirmComponent } from '../dialogconfirm/dialogconfirm.component';
import { AlertDialogService } from '../../../../services/alertdialog/alert-dialog.service';
import * as XLSX from 'xlsx';
import { SpinnerloadingService } from '../../../../services/spinner/spinnerloading.service';
@Component({
  selector: 'app-upfile',
  standalone: true,
  imports: [],
  templateUrl: './upfile.component.html',
  styleUrl: './upfile.component.css'
})
export class UpfileComponent {
//  @ViewChild("inputxlsx", { static: true }) meInputxlsx!:ElementRef<HTMLElement>
 alertDialogService:AlertDialogService=inject(AlertDialogService)
 @ViewChild("inputxlsx", { static: true }) meInputxlsx!:ElementRef<any>
 isDownload:Boolean=false;
 @Output() meTask=new EventEmitter<any>();
 @Output() viewInfo=new EventEmitter<any>();
 @Output() meNeedToken= new EventEmitter<any>();
 private meFile!:File|null;
 private meUpfileService:UpfileService=inject(UpfileService)
 private dialog:MatDialog= inject(MatDialog)
 spinnerloadingService:SpinnerloadingService=inject(SpinnerloadingService)
 downloadXlsx(){
  this.downloadXlsxBase()
  this.isDownload= true;
 }
 esperarUsers(data:any){
  this.meTask.emit(data)
 }
 sendViewInfo(existInfo:Boolean){
  this.viewInfo.next(existInfo)
 }
 sendNeedToken(needToken:Boolean){
  this.meNeedToken.next(needToken)
 }
 uploadFileXlsxUsers(){
  //
  //Recordar que se debe crear el token de el evento, para tener en cuenta los usuarios asignados
  //
  if(this.meFile){ 
    let existTokenEvent:{tieneToken:Boolean, meToken: string | null}=this.getLocalStorage("tokenevent") 
   if(existTokenEvent.tieneToken){
    //this.runMeTask(false, existTokenEvent)
    this.openMeDialog("¿Esta seguro que desea modificar y generar nuevos usuarios?", "Esta base de datos va modificar los usuarios existentes y creara los uaurios nuevos en la base de datos, segun nuevos correos electronicos, tenga cuidado!", [{name: "Si", value: true, description: "Se modificara informacion de usuarios, puede afectar datos ya ingresados, agregara tambien nuevos datos"}, {name:"No", value: false, description: "Validar base de datos, para subir datos de forma correcta"}], existTokenEvent, true)
    return 
   } 
   this.openMeDialog("¿Desea generar un token para cada uno de los usuarios?", "Esto va a funcionar como clave para el ingreso del los usuarios", [{name: "Si", value: true, description: "Se enviara un token al correo, en el ingreso se pedira correo electronico y token"}, {name:"No", value: false, description: "No se enviara ningun token, en el ingreso solo se pedira el correo electronico"}], existTokenEvent, false)
   return
  }
  //
  //Aqui debe enviar un mensaje que diga que no puede seguir sin cargar un archivo
  //
  console.log("¡no puede seguir sin cargar la base de datos!")
  this.alertDialogService.sendSubjectViewAlertDialog({
    name: "Not found file .xlsx",
    description: "¡no puede seguir sin cargar la base de datos! -> descargue y suba el archivo .xlsx",
    colortype: "red-500-tst"
  })
 }
 //runMeTask(isWithToken:Boolean){
 runMeTask(isWithToken:Boolean, existTokenEvent:{tieneToken:Boolean, meToken: string | null}){
  //
  //Se debe validar si existe o no el token, en caso de que si se enviar en falso, y en caso de que no se enviar en true
  //
  //let existTokenEvent:{tieneToken:Boolean, meToken: string | null}=this.getLocalStorage("tokenevent") 
  this.spinnerloadingService.isViewSpinner(true)
  this.meUpfileService.upfileXlsxUsers(this.meFile, isWithToken, existTokenEvent)
  .subscribe(e => {
   if(e.metokenevent != null && e.rowsInfo != null && e.rowsInfo.length > 0){
    //
    //Validar si es mejor guardar el token a la cokie desde aqui o desde la ventada de viewAllData
    //
    if(e.newToken){
     localStorage.setItem("tokenevent", e.metokenevent)
    }
    if(e.rowsInfo==null){
      this.alertDialogService.sendSubjectViewAlertDialog({
        name: "not-found-info",
        description: e.message,
        colortype: "red-500-tst"
      })
    }
    this.alertDialogService.sendSubjectViewAlertDialog({
      name: "Successfully",
      description: e.message,
      colortype: "green-500-tst"
    })
    this.esperarUsers(e)
    this.sendViewInfo(true)
    this.sendNeedToken(e.needTokenAssistant)
   }
   this.meFile= null
   this.meInputxlsx.nativeElement.value= null
   this.spinnerloadingService.isViewSpinner(false)
   console.log("borra info file")
   //
   //Aqui debe retornar un mensaje de no se pudo realizar o lo que sucedio
   //
  })
 }
 //changeI(input:Event){
 changeI(input:any){ 
  this.meFile= input.target.files[0]
  //
  //Validar si se sube un archivo o no para poder seguir al proximo paso
  //
  //
  //Aqui se debe activar el bottom para poder enviar el archivo al back -> se debe pensar bien la opción
  //
 }
 getLocalStorage(name:string){
  let meToken= localStorage.getItem(name)
  if(meToken!=null){
    return {tieneToken:true, meToken};
  }
  return {tieneToken:false, meToken: null};
 }
 getDataCookies(){
  let jsonBody= {"name": "dsd"};
  let f= document.cookie.split(";").forEach(i => {
    if(i.includes("infoevent")){
     let ii= i.split("=")
     let meBody= JSON.parse(JSON.stringify(ii[1].trim()))
     let meBodyy= JSON.stringify(ii[1])
     //return meBody
     jsonBody= meBody
    }
  })
 }
 
 openMeDialog(title:String, description:String, options:any[], infoToken:{tieneToken:Boolean, meToken: string | null}, viewSecondQuestion:Boolean){
  let infoDialogOpened= this.dialog.open(DialogconfirmComponent, { 
    data: {
      title,
      description,
      options,
      viewSecondQuestion
    },
  })
  infoDialogOpened.afterClosed().subscribe((i) => {
    if((i.opcion!="cierra" && i.optionType == 2 && i.opcion == true) || (i.opcion!="cierra" && i.optionType == 1)){
      this.runMeTask(i.opcion, infoToken)
    }
  })
 }
 downloadXlsxBase(){
  function s2ab(s:any){
   const buf= new ArrayBuffer(s.length)
   const view= new Uint8Array(buf)
   for(let i=0; i !=s.length; i++) view[i]=s.charCodeAt(i) & 0xFF;
   return buf;
  }
  let workbook= XLSX.utils.book_new()
  let worksheet= XLSX.utils.json_to_sheet([{name: "", email: "", edad: '', phone: ''}])
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  let excelFile= XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })
  const blob= new Blob([s2ab(excelFile)], { type: 'application/octet-stream' })
  let filename= "base_datos.xlsx";
  let url= URL.createObjectURL(blob)
  let a= document.createElement("a")
  a.href= url
  a.download= filename
  a.click()
  a.remove()
 }
}
