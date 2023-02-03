import { Component } from '@angular/core';
import { getCookie } from 'src/app/helpers/cookieHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'csrf-web-client';

  onSave() {
    
    fetch('http://127.0.0.1:8000/api/v1/get-csrf-token/', {
      method: 'GET',
      cache: 'no-cache',
      mode: 'no-cors'
    })
      .then(response => {
        console.log(response);
        const csrftoken = getCookie('csrftoken');
        console.log('csrftoken:', csrftoken);
      });

    fetch('http://127.0.0.1:8000/api/v1', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache',
      mode: 'no-cors'
    })
    .then((response) => {

      console.log('First result:',  response);

      const csrftoken = getCookie('csrftoken');
      console.log('csrftoken:', csrftoken);

      if (csrftoken) {

        fetch('http://127.0.0.1:8000/api/v1/auth/login', {
          method: 'POST',
          credentials: 'include',
          cache: 'no-cache',
          mode: 'no-cors',
          headers: {
            'X-CSRFToken': csrftoken
          }
        })
        .then((response) => {
          console.log('Second result:', response);
        })
        .catch((error) => {
          console.log('Cannot execute POST method. Error:', error);
        });

      }  
    })
    .catch((error) => {
      console.log('Cannot execute GET method. Error:', error);
    });
  }
}
