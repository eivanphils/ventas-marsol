import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SalesService } from '../../services/sales.service';
import { Product } from '../../interfaces/product';
import { SaleHistory } from '../../interfaces/sale-history';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[] = [];
  salesByProduct: SaleHistory[] = [];
  salesHistory: SaleHistory[] = [];
  salesHistoryBySeller: SaleHistory[] = [];
  loading: any;

  constructor(
    protected userService: UserService,
    protected saleService: SalesService,
    protected loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.presentLoading();
    setTimeout(() => {
      this.getAllProducts();
      this.getLastSales();
      this.getSalesBySeller();
    }, 2000);
  }

  getAllProducts() {
    this.saleService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
        this.loading.dismiss();
      },
      (error) => {
        this.loading.dismiss();
      }
    );
  }

  loadSalesByProduct(event) {
    const productId = event.detail.val;

    this.saleService.getAllSaleHistory(productId).subscribe(
      (response) => {
        console.log('sales by product', response);
        this.salesByProduct = response;
      }
    );
  }

  getLastSales() {
    this.saleService.getAllSaleHistory().subscribe(
      (response) => {
        this.salesHistory = response;
      }
    );
  }

  getSalesBySeller() {
    const username = 'abustos';
    this.saleService.getSalesHistoryBySeller(username).subscribe(
      (response) => {
        this.salesHistoryBySeller = response;
      }
    );
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots'
    });

    return this.loading.present();
  }
}
