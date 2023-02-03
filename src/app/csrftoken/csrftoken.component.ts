import { Component } from '@angular/core';
import { getCookie } from 'src/app/helpers/cookieHelper';

@Component({
  selector: 'app-csrftoken',
  templateUrl: './csrftoken.component.html',
  styleUrls: ['./csrftoken.component.css']
})

export class CSRFTokenComponent {
  csrftoken: string | null = getCookie('csrftoken');
}
