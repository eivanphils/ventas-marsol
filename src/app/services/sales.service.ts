import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment.prod';

const url = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(protected http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${url}/items`);
  }

  getAllSales() {
    return this.http.get<Sale[]>(`${url}/ventas`);
  }

  getAllSaleHistory() {
    return this.http.get<SaleHistory[]>(`${url}/history`);
  }

  getSalesHistoryByProduct(producId: number) {
    return this.http.get<SaleHistory[]>(`${url}/history/item/${producId}`);
  }

  getSalesHistoryBySeller(sellerName: string) {
    return this.http.get<SaleHistory[]>(`${url}/history/vendedor/${sellerName}`);
  }
}
