import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signup(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, data);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data).pipe(
      tap((result) => {
        if (result?.username) {
          localStorage.setItem('authUser', JSON.stringify(result));
        }
      }),
    );
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authUser');
  }
}
