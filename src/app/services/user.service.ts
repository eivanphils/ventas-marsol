import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

const url = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    protected storageService: StorageService,
    protected http: HttpClient
  ) { }


  saveToken(token) {
    this.storageService.saveItem('token', token);
  }

  getToken() {
    return this.storageService.getItem('token');
  }

  logIn(username: string, password: string) {
    return this.executeQuery('/login', username, password);
  }

  logOut() {
    this.storageService.removeItem('token');
  }

  private executeQuery<T>(query: string, username, password) {
    const headers = new HttpHeaders({
      Accept : 'application/json',
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    query = url + query;
    return this.http.get<T>(query, {headers});
  }
}
