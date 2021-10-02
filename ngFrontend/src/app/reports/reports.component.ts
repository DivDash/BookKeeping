import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from 'src/app/services/myservice.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  myChart: Chart;
  selectedProject: string;
  client: string;
  projects: string[] = [];
  clients: string[] = [];
  data: any = {};
  objects: any;
  object: any;
  monthsName: string[] = [
    'Jan',
    'Feb',
    'March',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'dec',
  ];
  validate: string[] = [];
  format: string[] = [];
  months: string[] = [];
  expenses: number[] = [];
  amounts: number[] = [];
  sum: number = 0;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private myservice: MyserviceService,
    private cookieService: CookieService,
    private router: Router
  ) {
    let token_value = cookieService.get('Book');
    console.log('VALUEE:', token_value);
    // if (!token_value) {
    //   this.router.navigateByUrl('login');
    // }
    this.myservice.getLiveCollection('viewaccountprofit').subscribe(
      (res) => {
        this.object = res;
        console.log(this.object);
        for (let i = 0; i < this.object.length; i++) {
          this.projects.push(this.object[i]['Project']);
        }
        console.log(this.projects);
      },
      (err) => {
        console.log(err);
      }
    );

    this.myservice.getLiveCollection('viewaccount').subscribe(
      (res) => {
        this.object = res;
        for (let i = 0; i < this.object.length; i++) {
          this.clients.push(this.object[i]['name']);
        }
        console.log(this.clients, 'clients');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    let token_value = this.cookieService.get('Book');
    console.log('VALUEE:', token_value);
    // if (!token_value) {
    //   this.router.navigateByUrl('login');
    // }
  }

  showerror(message) {
    this.toastr.error(message, 'Error!');
  }

  showsuccess(message) {
    this.toastr.success(message, 'Success!');
  }

  forReport(varr) {
    console.log('here at reportss');

    this.validate = [];
    this.format = [];
    this.months = [];
    this.expenses = [];
    this.amounts = [];
    this.sum = 0;

    this.data = {
      project: this.selectedProject,
    };
    if (this.selectedProject) {
      this.myservice.viewEntry(this.data).subscribe(
        (res) => {
          if (res['message'] === 'Project with This Client Dosent exist') {
            this.showerror(res['message']);
            if (this.myChart) {
              console.log('here at destroy');
              this.myChart.destroy();
            }
          } else {
            this.showsuccess('Account And Project Exist!!');
            this.objects = res['getEntries'];
            console.log(this.objects, 'top');

            for (let i = 0; i < this.objects.length; i++) {
              console.log(this.objects[i]['date']);
              if (this.objects[i]['date'][5] === '0') {
                this.format.push(this.objects[i]['date'][6]);
                this.amounts.push(this.objects[i]['amount']);
              } else {
                this.format.push(
                  this.objects[i]['date'][5] + this.objects[i]['date'][6]
                );
                this.amounts.push(this.objects[i]['amount']);
              }
            }

            console.log(this.format.length);
            console.log(this.amounts.length);

            for (let i = 0; i < this.format.length; i++) {
              console.log(i, 'loop');
            }

            for (let i = 0; i < this.format.length; i++) {
              if (this.validate.includes(this.format[i]) === false) {
                this.validate.push(this.format[i]);
                this.months.push(this.monthsName[parseInt(this.format[i]) - 1]);
                for (let j = 0; j < this.format.length; j++) {
                  if (this.format[i] === this.format[j]) {
                    this.sum = this.sum + this.amounts[j];
                  }
                }

                if (this.sum !== 0) {
                  this.expenses.push(this.sum);
                  this.sum = 0;
                }
              }
              console.log(i);
            }

            console.log(this.months, 'months');
            console.log(this.expenses, 'expenses');
            // this.myChart.destroy()
            if (this.myChart) {
              console.log('here at destroy');
              this.myChart.destroy();
            }

            this.chartFunc();
          }
        },
        (err) => {
          console.log('here at error');
          console.log(err);
        }
      );
    }
  }

  chartFunc() {
    this.myChart = new Chart('testChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'total Expense',
            data: this.expenses,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
