import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  data: any;
  constructor(protected storage: Storage) { }

  saveItem(key: string, value: any) {
    this.storage.set(key, value);
  }

  getItem(key) {
   this.storage.get(key).then((val) => {
      this.data = val;
    });

   return this.data;
  }

  removeItem(key) {
    this.storage.remove(key);
  }
}
