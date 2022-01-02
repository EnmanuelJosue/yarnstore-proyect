import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, CreateUserDTO } from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) {}

  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.apiUrl, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }
  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
