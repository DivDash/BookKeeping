import { Component, OnInit, ElementRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  chart;

  constructor(private db: DatabaseService, private elementRef: ElementRef) { }

  ionViewDidEnter() {
    this.db.getData().subscribe(resp => {
      const main = resp['main'];
      const temp_max = main.temp_max;
      const temp_min = main.temp_min;
      let date = resp['dt'];

      const jsdate = new Date(date * 1000);
      date = jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' });
      const htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
      this.chart = new Chart(htmlRef, {
        type: 'line',
        data: {
          labels: [date, date, date, date, date],
          datasets: [
            {
              data: temp_max,
              borderColor: '#3cba9f',
              fill: false
            },
            {
              data: temp_min,
              borderColor: '#ffcc00',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });
    });
  }

}
