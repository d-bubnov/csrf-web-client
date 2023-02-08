import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, ObservableInput, of } from "rxjs";
import { environment } from "src/environments/environment";
import { getCookie } from "../helpers/cookieHelper";
import { UserCredentials } from "../models/userCredentials";

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  private uri: string = environment.apiUrl;

  public constructor(private http: HttpClient) {}

  /** Логин пользователя в системе */
  authLogin(credentials: UserCredentials): Observable<boolean> {
    
    var formData: any = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return this.http
      .post(
        `${this.uri}/api-auth/login/`,
        formData,
        {
          withCredentials: true,
          responseType: 'text',
        })
      .pipe(
        map(() => {
          return of(true);
        }),
        catchError((error: any): ObservableInput<any> => {
          console.log(`Can't login. An error occured: `, error);
          return of(false);
        })
      );
  }

  /** Получение CSRF токена из эндпоинта */
  getCsrfToken(): Observable<boolean> {
    return this.http
      .get<void>(`${this.uri}/get-csrf-token/`, { withCredentials: true })
      .pipe(
        map(() => {
          const csrftoken = getCookie('csrftoken');
          console.log('csrftoken: ', csrftoken);
          return of(true);
        }),
        catchError((error: any): ObservableInput<any> => {
          console.log(`Can't get CSRF token from API. An error occured: `, error);
          return of(false);
        })
      );
  }

  /** Получение доступных эндпоинтов */
  getEndpoints(): Observable<{[key: string]:string} | null> {
    return this.http
      .get<{[key: string]:string}>(`${this.uri}/`, { withCredentials: true })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: any): ObservableInput<any> => {
          console.log(`Can't get endpoints from root API. An error occured: `, error);
          return of(null);
        })
      );
  }
}
