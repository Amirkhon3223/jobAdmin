import {Component, ElementRef, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-card-line-chart',
  templateUrl: './card-line-chart.component.html',
})
export class CardLineChartComponent {
  @ViewChild('lineCanvas') lineCanvas!: ElementRef;
  lineChart: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.lineChartMethod();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Visitor',
            //  lineTension: 0.2,
            fill: false,
            backgroundColor: 'rgb(204,255,0)',
            borderColor: 'rgb(0,0,0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(204,255,0)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: 'rgb(255,255,255)',
            pointHoverBorderColor: 'rgba(37,35,35,0.87)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          },
        ],
      },

    });
  }
}
