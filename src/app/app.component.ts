import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { getCookie } from 'src/app/helpers/cookieHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private cookieService: CookieService) {}

  onCsrfTokenClick() {
    // Получение CSRF токена из эндпоинта:
    this.getCsrfToken();
  }

  getCsrfToken() {
    fetch('http://127.0.0.1:8000/api/v1/get-csrf-token/', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })
    .then(() => {
      
      const csrftoken = getCookie('csrftoken');
      console.log('csrftoken: ', csrftoken);

      this.getEndpoints();
      this.authLogin();
    })
    .catch((error) => {
      console.log('Cannot execute GET method. Error:', error);
    });
  }

  getEndpoints() {
    // Получение эндпоинтов методом GET:
    fetch('http://127.0.0.1:8000/api/v1/', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
    .then(response => {
      return response.json();
    })
    .then((endpoints) => {
      console.log('Endpoints:', endpoints);
    })
    .catch((error) => {
      console.log('Cannot execute GET method. Error:', error);
    });
  }

  authLogin() {

    const csrfToken = getCookie('csrftoken');

    fetch('http://127.0.0.1:8000/api/v1/api-auth/login/', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'x-csrftoken': `${csrfToken}`
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin',
      }),
    })
    .then((response) => {
      // console.log('api/v1/api-auth/login', response);
    })
    .catch((error) => {
      console.log('Cannot execute POST method. Error:', error);
    });
  }
}
