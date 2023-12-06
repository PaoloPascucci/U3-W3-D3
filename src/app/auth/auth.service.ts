import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  apiUrl = environment.apiUrl;

  private authSubJ = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubJ.asObservable();
  utente!: AuthData;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiUrl}login`, data).pipe(
      tap((loggato) => {
        console.log(loggato);
        this.authSubJ.next(loggato);
        this.utente = loggato;
        console.log(this.utente);
        localStorage.setItem('user', JSON.stringify(loggato));
      }),
      catchError(this.errors)
    );
  }
  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accesToken)) {
      return;
    }
    this.authSubJ.next(userData);
  }
  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}register`, data);
  }
  logout() {
    this.authSubJ.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  private errors(err: any) {
    console.log(err);
    
    switch (err.error) {
      case 'Email already exist':
        return throwError('Email già registrata');
        break;
      case 'Email format is invalid':
        return throwError('Formato mail non valido');
        break;
      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }
}
