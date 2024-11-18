import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Userassistant } from '../../interfaces/user/userassistant';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient:HttpClient=inject(HttpClient)
  constructor() { }
  getAllUserByTokenEvent(tokenEvent:String | null){
    return this.httpClient.get<{listUsersByTokenEvent:Userassistant[], needTokenAssistant:Boolean}>(`${environment.api}/user/getallusersbytokenevent/${tokenEvent}`)
    .pipe(
      tap(e => {
        return e
      })
    )
  }
  updateStatusUserAssistant(email:String,tokenevent:String,statusAssistant:Number,isWithTokenAssistant:Boolean,tokenAssistant:String){
    //Recordar que status queda pendiente de cambio en el json de envio, para que pase a se statusAssistant
    console.log("try...")
    return this.httpClient.put<{ updated: Boolean, description: String, typeStatus: Number, info: [] | null}>(`${environment.api}/user/updatestatususerbytokeneventandemail`, { 
      email,
      tokenevent,
      status: statusAssistant,
      isWithTokenAssistant,
      tokenAssistant
     })
     .pipe(
      tap(r => {
        return r
      })
     )
  }
}
