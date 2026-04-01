import { inject, Injectable } from '@angular/core';
import { EmsServiceService } from '../services/ems-service.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  private static readonly BASE_URL = 'http://localhost:8099/v1';

  emsService = inject(EmsServiceService);

  isUserLoggedInSubject = new BehaviorSubject<boolean>(false);

  isUserLogged$ = this.isUserLoggedInSubject.asObservable();

  userDetails:LoginResponse = {
    uid: '',
    username: '',
    email: '',
    jwt: ''
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${AuthService.BASE_URL}/auth/login`, { username, password })
      .pipe(
        tap((res: LoginResponse) => {
          this.saveToken(res.jwt);
          this.isUserLoggedInSubject.next(true);
          this.userDetails = res;
        }),
      );
  }

  saveToken(jwtToken: string) {
    localStorage.setItem('jwt', jwtToken);
  }

  getToken() {
    localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.isUserLoggedInSubject.next(false);
  }
}
