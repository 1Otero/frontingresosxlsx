import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadComponent } from './modules/utils/head/head.component';
import { AlertDialogComponent } from './modules/utils/alert-dialog/alert-dialog.component';
import { SpinnerloadingComponent } from './modules/utils/spinnerloading/spinnerloading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadComponent, AlertDialogComponent, SpinnerloadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tstxlsxreaddata';
  constructor(){}
}
