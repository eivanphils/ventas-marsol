import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/product';
import { Sale } from '../interfaces/sale';
import { SaleHistory } from './../interfaces/sale-history';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';

const url = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  token: string;

  constructor(protected http: HttpClient,
              protected storage: Storage,
              protected storageService: StorageService,
              protected userService: UserService) {
    console.log('token contructor', this.storageService.getItem('token'));
  }

  getAllProducts() {
    return this.executeQuery<Product[]>('/items');
  }

  getAllSales() {
    return this.executeQuery<Sale[]>('/ventas');
  }

  getAllSaleHistory(productId: number = null) {
    let query;
    if (productId) {
      query = '/history/item/' + productId;
    } else {
      query = '/history/';
    }
    return this.executeQuery<SaleHistory[]>(query);
  }

  getSalesHistoryBySeller(sellerName: string) {
    return this.executeQuery<SaleHistory[]>(`/history/vendedor/${sellerName}`);
  }

  private executeQuery<T>(query: string) {
    this.token = this.storageService.getItem('token');

    const headers = new HttpHeaders({
      Accept : 'application/json',
      Authorization: 'Bearer ' + this.token
    });

    query = url + query;
    return this.http.get<T>(query, {headers});
  }
}
