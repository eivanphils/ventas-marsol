import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/product';
import { Sale } from '../interfaces/sale';
import { SaleHistory } from './../interfaces/sale-history';
import { UserService } from './user.service';
import { Storage } from '@ionic/storage';

const url = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(protected http: HttpClient,
              protected storage: Storage,
              protected userService: UserService) {}

  getAllProducts(token: string) {
    return this.executeQuery<Product[]>('/items', token);
  }

  getAllSales(token: string) {
    return this.executeQuery<Sale[]>('/ventas', token);
  }

  getAllSaleHistory(token: string, productId: number = null) {
    let query;
    if (productId) {
      query = '/history/item/' + productId;
    } else {
      query = '/history/';
    }
    return this.executeQuery<SaleHistory[]>(query, token);
  }

  getSalesHistoryBySeller(token: string, sellerName: string) {
    return this.executeQuery<SaleHistory[]>(`/history/vendedor/${sellerName}`, token);
  }

  private executeQuery<T>(query: string, token: string) {

    const headers = new HttpHeaders({
      Accept : 'application/json',
      Authorization: 'Bearer ' + token
    });

    query = url + query;
    return this.http.get<T>(query, {headers});
  }
}
