import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Floor } from './models/floor';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  constructor(private httpClient: HttpClient) {}

  getFloors(): Observable<Floor[]> {
    return this.httpClient.get<Floor[]>('/floors').pipe(
      map((body: Floor[]) => body),
      catchError(() => of([]))
    );
  }
}
