import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SabhasadOption {
  id: number;
  name?: string;
  fullName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createSabhasad(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/sabhasad`, data);
  }

  getSabhasadOptions(): Observable<SabhasadOption[]> {
    return this.http.get<SabhasadOption[]>(`${this.baseUrl}/sabhasad`);
  }

  getVarganiCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/vargani/count`);
  }

  createVargani(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/vargani`, data);
  }

  getVargani(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vargani`);
  }
}
