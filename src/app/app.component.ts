import { Component } from '@angular/core';
import { UserCredentials } from './models/userCredentials';
import { CsrfService } from './services/csrfService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private csrfService: CsrfService) {}

  handleGetCsrfTokenClick() {
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
            .authLogin({
              username: 'admin',
              password: 'admin'
            } as UserCredentials)
            .subscribe((success: boolean) => {
              if (success) {
                console.log('User logged in!');
              }
            });
        }
      });
  }
}
