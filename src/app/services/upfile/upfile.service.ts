import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpfileService {
  private httpClient:HttpClient=inject(HttpClient)
  constructor() { }
  upfileXlsxUsers(file:any, isWithToken:Boolean, tokenEventExist:{tieneToken:Boolean, meToken:string | null }):Observable<any>{
   const formData= new FormData()
   let tokenEvent= tokenEventExist.meToken==null?"":String(tokenEventExist.meToken)
   formData.append("file", file)
   formData.append("isWithToken", String(isWithToken))
   formData.append("tokenevent", tokenEvent)
   formData.append("tokeneventexist", String(tokenEventExist.tieneToken))
   return this.httpClient.post(`${environment.api}/upfile/readxlsxwithusers`, formData)
   .pipe(
    tap(e => {
      return e
    })
   )
  }
}
