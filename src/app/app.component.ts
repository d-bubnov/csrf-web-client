import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'csrf-web-client';

  getCookie = (name: string): string | null => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
  }

  onSave() {
    
    fetch('http://127.0.0.1:8000/api/v1', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache',
      mode: 'cors'
    })
    .then((response) => {

      console.log('First result:',  response.json());

      const csrftoken = this.getCookie('csrftoken');
      console.log('csrftoken:', csrftoken);

      if (csrftoken || true) {

        fetch('http://127.0.0.1:8000/api/v1/auth/login', {
          method: 'POST',
          credentials: 'include',
          cache: 'no-cache',
          mode: 'cors',
          headers: {
            'X-CSRFToken': csrftoken
          }
        })
        .then((response) => {

          console.log('Second result:', response.json());
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
