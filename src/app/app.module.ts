import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CSRFTokenComponent } from './csrftoken/csrftoken.component';
import { CsrfService } from './services/csrfService';

@NgModule({
  declarations: [
    AppComponent,
    CSRFTokenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule
      .withOptions({
        cookieName: 'csrftoken',
        headerName: 'X-CSRFTOKEN',
      }),
  ],
  providers: [ CsrfService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
