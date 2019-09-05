import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(protected salesService: SalesService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  ionViewWillEnter(){
   this.getAllProducts();
  }

  getAllProducts() {
    this.salesService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      }
    );
  }
}
