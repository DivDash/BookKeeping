import { Component, OnInit, ElementRef } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

import { Chart } from 'chart.js';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  chart;
  city: string;

  constructor(private db: DatabaseService, private elementRef: ElementRef, private authService: AuthenticationService) { }

  ionViewDidEnter() {
    this.getWeather('Karachi');
  }

  logout() {
    this.authService.logout();
  }

  getWeather(city: string) {
    this.db.getData(city).subscribe(resp => {
      const main = resp['main'];
      const temp_max = main.temp_max;
      const temp_min = main.temp_min;
      let date = resp['dt'];

      console.log(temp_max, temp_min, date);

      const jsdate = new Date(date * 1000);
      date = jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' });
      const htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
      this.chart = new Chart(htmlRef, {
        type: 'line',
        data: {
          labels: [date, date, date],
          datasets: [
            {
              data: [temp_max, temp_max + 1, temp_max - 2],
              borderColor: '#3cba9f',
              fill: false
            },
            {
              data: [temp_min, temp_min + 2, temp_min - 3],
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
