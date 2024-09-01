import { inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _snackbar = inject(MatSnackBar);

  notify(message: string, action: string): void {
    this._snackbar.open(message, action),  {
      duration: 3000
    }
  } 

}
