import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { getCookie } from 'src/app/helpers/cookieHelper';

interface TokenResponse {
  csrf_token: string;
};

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
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response.json();
    })
    .then((token: TokenResponse) => {
      if (token && token.csrf_token) {
        // Засетим токен в наши куки:
        document.cookie = `csrftoken=${token.csrf_token}`;

        console.log('csrftoken', token.csrf_token);

        this.getEndpoints(token.csrf_token);
        this.authLogin(token.csrf_token);
      }
    })
    .catch((error) => {
      console.log('Cannot execute GET method. Error:', error);
    });
  }

  getEndpoints(csrfToken: string) {
    // Получение эндпоинтов методом GET:
    fetch('http://127.0.0.1:8000/api/v1/', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-csrftoken': csrfToken,
      },
    })
    .then(response => {
      return response.json();
    })
    .then((endpoints) => {
      // console.log('Endpoints', endpoints);
    })
    .catch((error) => {
      console.log('Cannot execute GET method. Error:', error);
    });
  }

  authLogin(csrfToken: string) {

    fetch('http://127.0.0.1:8000/api/v1/api-auth/login/', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-csrftoken': csrfToken,
          'Authorization': 'Basic admin:admin'
      },
    })
    .then((response) => {
      // console.log('api/v1/api-auth/login', response);
    })
    .catch((error) => {
      console.log('Cannot execute POST method. Error:', error);
    });
  }
}
