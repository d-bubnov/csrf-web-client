import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookiesDialogComponent } from './cookies-dialog/cookies-dialog.component';

import { UserCredentials } from './models/userCredentials';
import { CsrfService } from './services/csrfService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private csrfService: CsrfService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar)
  {}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Закрыть');
  }

  handleShowCookiesClick(): void {
    this.dialog.open(CookiesDialogComponent);
  }

  handleGetCsrfTokenClick(): void {

    if (this.username.invalid || this.password.invalid) {
      this.openSnackBar('Введите учетные данные');
      return;
    }

    const credentials = {
      username: this.username.value,
      password: this.password.value
    } as UserCredentials

    this.csrfService
      .getCsrfToken()
      .subscribe((success: boolean) => {
        if (success) {
          // Получим эндпоинты из корневого URI:
          this.csrfService
            .getEndpoints()
            .subscribe((endpoints) => {
              console.log('Endpoints: ', endpoints);
            });

          // Попытаемся залогиниться:
          this.csrfService
            .authLogin(credentials)
            .subscribe((success: boolean) => {
              if (success) {
                this.openSnackBar('Пользователь успрешно вошел в систему');
              }
            });
        }
      });
  }
}
