import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SalesService } from '../../services/sales.service';
import { Product } from '../../interfaces/product';
import { SaleHistory } from '../../interfaces/sale-history';
import { User } from '../../interfaces/user';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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
  user: User;
  token: string;

  constructor(
    protected router: Router,
    protected userService: UserService,
    protected storage: Storage,
    protected saleService: SalesService,
    protected loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.presentLoading();
    this.storage.get('token').then((token) => {
      this.token = token;
      this.getAllProducts();
      this.getLastSales();
      this.getSalesBySeller();
    });
  }

  getAllProducts() {
    this.saleService.getAllProducts(this.token).subscribe(
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
    const productId = event.detail.value;
    this.salesByProduct = [];
    this.saleService.getAllSaleHistory(this.token, productId).subscribe(
      (response) => {
        this.salesByProduct = response;
      }
    );
  }

  getLastSales() {
    this.saleService.getAllSaleHistory(this.token).subscribe(
      (response) => {
        this.salesHistory = response;
      }
    );

  }

  getSalesBySeller() {
    this.storage.get('user').then((user) => {
      this.user = user;
      this.saleService.getSalesHistoryBySeller(this.token, this.user.usuario).subscribe(
        (response) => {
          this.salesHistoryBySeller = response;
        }
      );
    });
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots'
    });

    return this.loading.present();
  }
}
