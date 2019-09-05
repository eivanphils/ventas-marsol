import { Component, OnInit, Input } from '@angular/core';
import { SaleHistory } from '../../interfaces/sale-history';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss'],
})
export class SalesChartComponent implements OnInit {
  @Input() sales: SaleHistory[];

  constructor() { }

  ngOnInit() { 
    console.log('sales chart', this.sales);
  }

}
