import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<User>(`${url}/login?user=${username}&pass=${password}`);
  }

  logOut() {
    this.storageService.removeItem('token');
  }
}
