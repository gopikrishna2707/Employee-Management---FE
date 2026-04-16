import { inject, Injectable, signal, Signal } from '@angular/core';
import { EmsServiceService } from '../services/ems-service.service';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  map,
  shareReplay,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../models/UserDetails';
import { UserRoles } from '../models/UserRoles';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient); // Modern inject() syntax
  private static readonly BASE_URL = 'http://localhost:8099/v1';

  // 1. Single Source of Truth
  private userDetails = new BehaviorSubject<UserDetails | null>(null);
  public userDetails$ = this.userDetails.asObservable();

  // 2. Computed Observables
  public isLoggedIn$ = this.userDetails$.pipe(map((user) => !!user));

  // public isAdmin$ = this.userDetails$.pipe(
  //   map((user) => user?.roles.includes(UserRoles.ROLE_ADMIN) ?? false),
  //   shareReplay(1),
  // );

  public isAdmin$ = this.userDetails$.pipe(
    map((user) => user?.roles.includes(UserRoles.ROLE_ADMIN) ?? false),
    tap((value) => console.log('isAdmin value:', value)), // Logs every time it changes
    shareReplay(1)
);

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
    const token = localStorage.getItem('jwt');
    const uid = localStorage.getItem('uid');

    if (token && uid) {
      // Instead of manual subscribe, trigger the fetch
      this.fetchAndSetUser(uid);
    }
  }

  loginUser(username: string, password: string): Observable<UserDetails> {
    return this.http
      .post<LoginResponse>(`${AuthService.BASE_URL}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => this.handleAuthSuccess(res)),
        switchMap((res) => this.getUserDetails(res.uid)), // Automatically chains the GET call
      );
  }

  sighupUser(
    email:string,
    username: string,
    password: string,
    roles: string,
  ): Observable<any> {
    return this.http
      .post<any>(`${AuthService.BASE_URL}/auth/signup`, {
        email,
        username,
        password,
        roles
      })
      .pipe(
        map((res) => {
          return res;
        }),
      );
  }

  private handleAuthSuccess(res: LoginResponse) {
    localStorage.setItem('jwt', res.jwt);
    localStorage.setItem('uid', res.uid);
    localStorage.setItem('expireTime', res.expireDate.toString());
  }

  private fetchAndSetUser(uid: string) {
    this.getUserDetails(uid).subscribe({
      error: () => this.logout(), // Auto-logout if token is expired/invalid
    });
  }

  getUserDetails(uid: string): Observable<UserDetails> {
    return this.http
      .get<UserDetails>(`${AuthService.BASE_URL}/auth/users/${uid}`)
      .pipe(
        tap((user) => this.userDetails.next(user)),
        shareReplay(1),
      );
  }

  getAllUserRolesandPermissions(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${AuthService.BASE_URL}/auth/users`);
  }

  logout() {
    localStorage.clear(); // Cleans everything safely
    this.userDetails.next(null);
  }
}
