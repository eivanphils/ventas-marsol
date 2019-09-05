import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SaleHistory } from '../../interfaces/sale-history';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss'],
})
export class SalesChartComponent implements OnInit {
  @Input() sales: SaleHistory[];
  @Input() colorA: string;
  @Input()colorB: string;
  @ViewChild('barChart', {static: true}) barChart;

  bars: any;
  labels: any[] = [];
  quantitySold: any[] = [];
  totalEarned: any[] = [];

  constructor() { }

  ngOnInit() {
    this.preprareData();
  }

  preprareData() {
    this.sales.forEach((sale) => {
      this.labels.push(moment(sale.fecha).format('DD/MM/YYYY'));
      this.quantitySold.push(Number(sale.cantidad_vendida));
      this.totalEarned.push(sale.total_vendido);
    });
    this.createBarChart();
  }

  createBarChart() {

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Cantidad vendida',
          data: this.quantitySold,
          backgroundColor: this.colorA,
          borderColor: this.colorA,
          borderWidth: 1
        },
        {
          label: 'Monto facturado',
          data: this.totalEarned,
          backgroundColor: this.colorB,
          borderColor: this.colorB,
          borderWidth: 1
        }
      ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
