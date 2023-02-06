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
    
    fetch('http://127.0.0.1:8000/api/v1/get-csrf-token/', {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
        const csrftoken = getCookie('csrftoken');
        console.log('Call `api/v1/get-csrf-token` API. Value of the csrftoken:', csrftoken);

        const csrftokenApi = this.cookieService.get('csrftoken');
        console.log('Call `api/v1/get-csrf-token` API. Value of the csrftoken (from service):', csrftokenApi);

        this.fetchApi();
    });
  }

  fetchApi(){

    fetch('http://127.0.0.1:8000/api/v1/', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
    })
    .catch((error) => {
      console.log('Cannot execute GET method. Error:', error);
    });


    const csrftoken = getCookie('csrftoken');

    fetch('http://127.0.0.1:8000/api/v1/api-auth/login/', {
      method: 'POST',
      credentials: 'include',
      cache: 'no-cache',
      mode: 'no-cors',
      headers: {
        'HTTP_X_CSRFTOKEN': `${csrftoken}`
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin',
      }),
    })
    .then((response) => {
      const csrftoken = getCookie('csrftoken');
      console.log('Call `api/v1/api-auth/login` API. Value of the csrftoken:', csrftoken);
    })
    .catch((error) => {
      console.log('Cannot execute POST method. Error:', error);
    });


  }
}
