import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Storage } from '@ionic/storage';

const url = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    protected storage: Storage,
    protected http: HttpClient
  ) { }

  saveUserData(userData: User) {
    this.storage.set('user', userData);
    this.storage.set('token', userData.access_token);
  }

  logIn(username: string, password: string) {
    return this.executeQuery<User>('/login', username, password);
  }

  logOut() {
    this.storage.remove('token');
    this.storage.remove('user');

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
