import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../../services/users/users.service';
import { AlertDialogService } from '../../../../services/alertdialog/alert-dialog.service';
import { SpinnerloadingService } from '../../../../services/spinner/spinnerloading.service';

@Component({
  selector: 'app-viewalldataxlsx',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewalldataxlsx.component.html',
  styleUrl: './viewalldataxlsx.component.css'
})
export class ViewalldataxlsxComponent{
  @Input("mesendedtst") sendedInfo:any
  @Input("viewInfoExist") viewInfo:Boolean=false;
  @Output() needToken=new EventEmitter<any>();
  alertDialogService:AlertDialogService=inject(AlertDialogService);
  //Recordar implementa el new Subject<>  por el new EventEmitter<any>()
  private userService:UsersService=inject(UsersService)
  @Input("existInfoAssistant") existInfo!:Boolean;
  spinnerloadingService:SpinnerloadingService=inject(SpinnerloadingService)
  constructor(){
    //Se debe validar si existe o no token asignado al client, en caso de que exista se debe activar el metodo getAllUsersByCodEvent()
    afterNextRender(() => {
      Promise.resolve().then(e => {
        this.spinnerloadingService.isViewSpinner(true)   
      })
      let info= this.getExistTokenEvent()
      if(info.existToken){
        Promise.resolve().then(e => {
          this.existInfo= true;
        })
        this.getAllUsersByTokenEvent(info.token)
      }
      Promise.resolve().then(e => {
        this.spinnerloadingService.isViewSpinner(false)
      })
      console.log("¡fff!")
    })
  }
  //****Aqui se deb preguntar si existe o no un token de un evento anterior, en caso de no existit entonces queda en espera hasta que la respuesta de la carga de los usuarios
  //****este completa para poder iniciar la consulta ---> recordad poner un Observable - Subscribe -> debemos estar pendiente del componente upfile hasta que suba 
  //el archivo completo
  //****En caso de que exista token se debe consultar de una vez y se muestran los datos
  resetInfo(){
    this.sendedInfo= null
    localStorage.removeItem("tokenevent")
    this.existInfo= false;
    this.alertDialogService.sendSubjectViewAlertDialog({
      name: "Successfully",
      description: 'Se eliminaron los registros de este evento',
      colortype: "red-500-tst"
    })
  }  
  getAllUsersByCodEvent(meToken:String | null){
    //Se debe consultar al back con el token un evento con ese codigo o clave
  }
  getExistTokenEvent(){
   //let meTokenn= sessionStorage.getItem("tokenevent")
   let meToken= localStorage.getItem("tokenevent") 
   if(meToken!=null){
    return {existToken: true, token: meToken}
   }
   return {existToken: false, token: null}
  }
  getAllUsersByTokenEvent(meTokenEvent:String | null) {
    //this.spinnerloadingService.isViewSpinner(true)
    this.userService.getAllUserByTokenEvent(meTokenEvent)
    .subscribe((e) => {
     console.log(e)
     if(e && e != null){
      this.changeNeedToken(e.needTokenAssistant)
      this.sendedInfo= {rowsInfo: e.listUsersByTokenEvent}
      //this.spinnerloadingService.isViewSpinner(false)
      return
     }
     //this.spinnerloadingService.isViewSpinner(false)
     console.log("no found info user")
    })
  }
  getColorByStatus(status:Number){
   switch(status){
    case 1: return "gray-500"
    case 2: return "green-300"
    case 3: return "orange-300"
    case 4: return "red-300"
    default: return "blue-300" 
   }
  }
  changeNeedToken(needToken:Boolean){
    this.needToken.next(needToken)
  }
}
