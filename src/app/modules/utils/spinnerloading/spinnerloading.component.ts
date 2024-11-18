import { Component, inject, Input, OnInit } from '@angular/core';
import { SpinnerloadingService } from '../../../services/spinner/spinnerloading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinnerloading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinnerloading.component.html',
  styleUrl: './spinnerloading.component.css'
})
export class SpinnerloadingComponent implements OnInit{
 spinnerloadingService:SpinnerloadingService=inject(SpinnerloadingService) 
 @Input("meViewSpinnerLoading") viewSpinnerLoading:Boolean=false;
 ngOnInit():void{
  this.spinnerloadingService
  .isViewSpinnerObservable
  .subscribe(e => {
    this.viewSpinnerLoading= e;
  })
 }
}
