import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {

  private apiUrl = 'http://localhost:5000'; // Base URL of your backend server

  constructor(private http: HttpClient) { }

  // Method to save an array
  saveArray(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-array`, data);
  }

  // New method to fetch all arrays
  getArrays(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-arrays`);
  }
}
