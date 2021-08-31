import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShowHideDirective } from '@angular/flex-layout';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements DoCheck{
  newDivs:addDivisions[]=[];
  newEntries:entries[]=[]
  object:any
  projects:string[] = []
  clients:string[]=[]
  clients2:string[]=[]
  entriesObject:entries[]=[{project:"",
    client:"",
    receiver:"",
    amount:"",
    reason:"",
    method:"",
    remarks:""}];
    project:string=""
    client:string=""
    receiver:string=""
    amount:string=""
    reason:string=""
    method:string=""
    remarks:string=""
    i:number=0
  selectedProject:string;
  date:string
  sum:number=0
  total:number
  data:any={}
  objects:any
  objectsEmpty:any=[]

  listData: MatTableDataSource<any>;

  addNewDiv(){
 
    this.newDivs.push({
      project:this.selectedProject,
      client:this.client,
      date:this.date,
      amount: 0,
      receiver: "",
      reason: "",
      method:"",
      remarks:""
    });
  }

  remove(todel){
    let objects=this.newDivs.filter(function(obj) { return obj.receiver !==todel ; });
    this.newDivs=objects
    let temp:number=0
    for(let i=0;i<this.newDivs.length;i++)
    {
      temp=temp + this.newDivs[i]['amount']
    }
    this.sum=temp
    
  }

  showerror(message){
    console.log("here")
    this.toastr.error(message, 'Error!');
  }

  showsuccess(message){
    this.toastr.success(message, 'Success!');
  }

  

  final(){
    console.log(this.newDivs)
    let summ:number=0
    for(let i=0;i<this.newDivs.length;i++){
      summ=summ + this.newDivs[i]['amount']
    }

    if(summ===this.total){
      console.log("debit = credit")
      console.log(this.newDivs)
      this.http
      .post( "http://localhost:5000/Entries",this.newDivs, {
        withCredentials: true
      } )
      .subscribe(
        res => {
          {
           console.log(res)
           if(res['message']==='Entries are added'){
           this.showsuccess(res['message'])
           this.newDivs=[]
           this.client=""
           this.selectedProject=""
           this.total=0
           }
           else{
             this.showerror(res['message'])
           }
          }
        },
        err => {
          console.log( err )
          console.log( err["message"] )
        }
      );
    }
    else{
      this.showerror('Debit Is Not Equal To Credit')
      console.log("debit not equal to credit")
    }

    
  }

  constructor(private http: HttpClient,private toastr: ToastrService)
   { 
    // this.entriesObject[0].client = "dsa"
    // console.log(this.entriesObject[0]["amount"])
    this.http
    .get( "http://localhost:5000/ViewProfit",{
      withCredentials:true
    })
    .subscribe(
      res => {
        this.object=res
        console.log(this.object)
        for (let i=0;i<this.object.length;i++){
          this.projects.push(this.object[i]['Project'])
        }
        console.log(this.projects)
      },
      err =>  {
        console.log( err )
      }
    )

    this.http
    .get( "http://localhost:5000/ViewAccount",{
      withCredentials:true
    })
    .subscribe(
      res => {
        this.object=res
        for (let i=0;i<this.object.length;i++){
          this.clients.push(this.object[i]['name'])
        }
        this.clients2=this.clients
        console.log(this.clients,"sas")
      },
      err =>  {
        console.log( err )
      }
    )




   }

   ngDoCheck(): void {
    let temp:number=0
    for(let i=0;i<this.newDivs.length;i++)
    {
      temp=temp + this.newDivs[i]['amount']
    }
    this.sum=temp
     
   }
  
  
  
 addEntry(){
  console.log(this.newDivs,"test")
 }

 forTable(varr){
   console.log(this.client,this.selectedProject,"forTABLE")
   console.log(this.data,"dataa")

   this.newDivs.map((obj)=>{
    if(obj['client']!==this.client || obj['project']!==this.selectedProject){
      obj['client']=this.client
      obj['project']=this.selectedProject
    }
  })

    console.log("dataa")

    this.data = {
      client: this.client,
      project: this.selectedProject,
    }
    if(this.client && this.selectedProject){
    this.http
    .post( "http://localhost:5000/ViewEntry",this.data,{
      withCredentials:true
    })
    .subscribe(
      res => {
        console.log("here at res")
        console.log(res)
        if(res['message']==='Project with This Client Dosent exist')
        {
          this.showerror(res['message'])

          this.listData = new MatTableDataSource(this.objectsEmpty)
        }
        else{
        console.log("here at if forms")  
        this.showsuccess('Account And Project Exist!!')
        this.objects=res['getEntries']

        for(let i=0;i<this.objects.length;i++){
          this.objects[i].delete="delete"
        }

        this.listData = new MatTableDataSource(this.objects)
        }
        
      },
      err =>  {
        console.log("here at error")
        console.log( err )
      }
    )
    }

   
   
  }
 


 columnHeader2 = {
  project:"project",
  client:" client",
  amount:"amount",
  receiver:"receive",
  reason:"reason",
  method:"method",
  remarks:"remarks",
  delete:'  '
};



}


export interface addDivisions {
  project:string;
  client:string;
  date:string;
  receiver: string;
  reason: string;
  amount: number;
  method:string
  remarks:string
}

export interface entries {
  project:string;
  client:string
  receiver:string
  amount:string
  reason:string
  method:string
  remarks:string
}