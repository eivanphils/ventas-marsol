import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(protected storage: Storage) { }

  saveItem(key: string, value: any) {
    this.storage.set(key, value);
  }

  getItem(key) {
    this.storage.get(key);
  }

  removeItem(key) {
    this.storage.remove(key);
  }
}
