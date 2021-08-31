import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart ,registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../services/myservice.service';
// Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  myChart:Chart
  selectedProject:string;
  client:string
  projects:string[] = []
  clients:string[]=[]
  data:any={}
  objects:any
  object:any
  monthsName:string[]=['Jan', 'Feb', 'March', 'Apr', 'May', 'June','July', 'Aug', 'Sep', 'Oct','Nov','dec']
  validate:string[]=[]
  format:string[]=[]
  months:string[]=[]
  expenses:number[]=[]
  amounts:number[]=[]
  sum:number=0

  constructor( private myservice:MyserviceService ) {

    // this.myservice.viewProfit()
    // .subscribe(
    //   res => {
    //     this.object=res
    //     console.log(this.object)
    //     for (let i=0;i<this.object.length;i++){
    //       this.projects.push(this.object[i]['Project'])
    //     }
    //     console.log(this.projects)
    //   },
    //   err =>  {
    //     console.log( err )
    //   }
    // )

    // this.myservice.viewAccount()
    // .subscribe(
    //   res => {
    //     this.object=res
    //     for (let i=0;i<this.object.length;i++){
    //       this.clients.push(this.object[i]['name'])
    //     }
    //     console.log(this.clients,"sas")
    //   },
    //   err =>  {
    //     console.log( err )
    //   }
    // )




   }

  ngOnInit(): void {
  }

}
