import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Product } from '../../interfaces/product';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(
    protected salesService: SalesService,
    protected storage: Storage) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.storage.get('token').then((token) => {
      this.salesService.getAllProducts(token).subscribe(
        (response) => {
          this.products = response;
        }
      );
    });
  }
}
