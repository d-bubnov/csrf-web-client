import { Component } from '@angular/core';
import { getAllCookies } from '../helpers/cookieHelper';
import { CookieEntry } from '../models/cookieEntry';

@Component({
  selector: 'app-cookies-dialog',
  templateUrl: './cookies-dialog.component.html',
  styleUrls: ['./cookies-dialog.component.css']
})
export class CookiesDialogComponent {
  cookies: CookieEntry[];
  displayedColumns: string[] = ['name', 'value'];

  constructor() {
    this.cookies = getAllCookies();
  }
}
