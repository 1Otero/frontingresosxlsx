import { Component, inject } from '@angular/core';
import { UpfileComponent } from "../page/upfile/upfile.component";
import { ViewalldataxlsxComponent } from "../page/viewalldataxlsx/viewalldataxlsx.component";
import { ViewChangeStatusAssistantComponent } from '../page/view-change-status-assistant/view-change-status-assistant.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UpfileComponent, ViewalldataxlsxComponent, ViewChangeStatusAssistantComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
 dataInfo:any;
 existInfo:Boolean=false;
 needToken:Boolean=false;
 constructor(){}
 sendInfoData(data:any){
  this.dataInfo= data;
 }
 viewExistInfo(existInfo:Boolean){
  this.existInfo= existInfo;
 }
 updateNeedToken(needToken:Boolean){
  this.needToken= needToken;
 }
}
