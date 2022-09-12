import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private httpClient: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>('/rooms').pipe(
      map((body: Room[]) => body),
      catchError(() => of([]))
    );
  }

  createRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>('/rooms', room).pipe(
      map((body: Room) => body),
      catchError(() => of())
    );
  }

  getRoomsByFloorId(id: number): Observable<Room[]> {
    const params = new HttpParams().set('floor_id', id);
    return this.httpClient.get<Room[]>('/rooms', { params }).pipe(
      map((body: Room[]) => body),
      catchError(() => of([]))
    );
  }

  getRoomsByName(name: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`/rooms?name_like=${name}`).pipe(
      map((body: Room[]) => body),
      catchError(() => of([]))
    );
  }

  updateRoom(room: Room): Observable<Room> {
    return this.httpClient.patch<Room>(`/rooms/${room.id}`, room).pipe(
      map((body: Room) => body),
      catchError(() => of())
    );
  }

  deleteRoom(id: number): Observable<any> {
    return this.httpClient.delete<any>(`/rooms/${id}`).pipe(
      map((body: any) => body),
      catchError(() => of())
    );
  }
}
