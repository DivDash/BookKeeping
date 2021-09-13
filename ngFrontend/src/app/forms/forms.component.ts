import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShowHideDirective } from '@angular/flex-layout';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../services/myservice.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements DoCheck{
  newDivs:addDivisions[]=[];
  newEntries:entries[]=[]
  object:any
  objectEntry:any
  projects:string[] = []
  clients:string[]=[]
  clientsBank:string[]=[]
  ids:string[]=[]
  clients2:string[]=[]
    project:string=""
    client:string=""
    receiver:string=""
    amount:string=""
    reason:string=""
    method:string=""
    remarks:string=""
    id_c:string=""
    id_r:string=""
    i:number=0
  selectedProject:string;
  date:string
  sum:number=0
  total:number
  data:any={}
  objects:any
  objectsEmpty:any=[]
  matchClient:string
  newClient:string
  getId:string=""


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
      remarks:"",
      idClient:"",
      idRec:""
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
    this.toastr.warning(message, 'Warning!');
  }

  showsuccess(message){
    this.toastr.success(message, 'Success!');
  }



  final(){
    console.log(this.newDivs)
    for(let i=0;i<this.newDivs.length;i++){
    this.newDivs[i]['client']=this.newDivs[i]['client'].substr(0,this.newDivs[i]['client'].indexOf("-"))
    this.newDivs[i]['idRec']=this.ids[this.clientsBank.indexOf(this.newDivs[i]['receiver'])]
    this.newDivs[i]['receiver']=this.newDivs[i]['receiver'].substr(0,this.newDivs[i]['receiver'].indexOf("-"))
    this.newDivs[i]['idClient']=this.ids[this.clientsBank.indexOf(this.client)]
  

    }

    console.log(this.newDivs,"finalDivssss")

    let summ:number=0
    for(let i=0;i<this.newDivs.length;i++){
      summ=summ + this.newDivs[i]['amount']
    }

    if(summ===this.total){
      console.log("debit = credit")
      console.log(this.newDivs)

      if(this.matchClient!==this.getId){
          console.log("non client")
          this.objectEntry={
          newDivs:this.newDivs,
          option:"non-client"
        }
      }

      if(this.matchClient===this.getId){
        console.log("client")
        this.objectEntry={
        newDivs:this.newDivs,
        option:"client"
      }
    }

      this.myservice.createEntry(this.objectEntry)
      .subscribe(
        res => {
          {
           console.log(res)
           if(res['message']==='Entries are added'){
           this.showsuccess(res['message'])
           this.newDivs=[]
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

  constructor(private http: HttpClient,private toastr: ToastrService,private myservice:MyserviceService)
   {
    // this.entriesObject[0].client = "dsa"
    // console.log(this.entriesObject[0]["amount"])
    this.myservice.getLiveCollection('viewaccountprofit')
    .subscribe(
      res => {
        this.object=res
        // console.log(this.object)
        for (let i=0;i<this.object.length;i++){
          this.projects.push(this.object[i]['Project'])
        }
        // console.log(this.projects)
      },
      err =>  {
        console.log( err )
      }
    )

    this.myservice.getLiveCollection('viewaccount')
    .subscribe(
      res => {
        this.object=res
        console.log(this.object,"accounts")
        for (let i=0;i<this.object.length;i++){
          this.clients.push(this.object[i]['name'])
          this.clientsBank.push(this.object[i]['name']+"-"+this.object[i]['Bank'])
          this.ids.push(this.object[i]['_id'])
        }
        this.clients2=this.clients

        console.log(this.clientsBank)
        console.log(this.ids)
        // console.log(this.clients,"sas")
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

   console.log(this.selectedProject,"forTABLE")


   this.newDivs.map((obj)=>{
    if(obj['client']!==this.client || obj['project']!==this.selectedProject){
      obj['client']=this.client
      obj['project']=this.selectedProject
    }
  })

    this.data = {
      project: this.selectedProject,
    }
    console.log(this.data,"dataa")

    if(this.selectedProject){
    console.log("check")
    this.myservice.getLiveCollectionPost('viewentryparams', this.data)
    .subscribe(
      res => {
        console.log(res)
        if(res['message']==='Project With The Non-Client Is Selected')
        {
          this.listData = new MatTableDataSource(this.objectsEmpty)
        }
        else{

          this.objects=res['getEntries']
          if(res['getEntries']===undefined){
            this.objects=res
          }
          if(res['getEntries']){
          console.log(res['projectExist'],"at projecttt")  
          console.log(res['projectExist'][0]['Client'],"clientttt")
          this.matchClient=res['projectExist'][0]['idClient']
          }
  
          console.log(this.matchClient,"matchClient")

          if(this.objects!==undefined)
          {
            for(let i=0;i<this.objects.length;i++){
              this.objects[i].delete="delete"
              this.objects[i].update="update"
            }
            this.listData = new MatTableDataSource(this.objects)
            console.log(this.listData,"entry params")

          }

        }




      },
      err =>  {
        console.log("here at error")
        console.log( err )
      }
    )
    }

    if(this.client){
      console.log("here at if client")
      console.log(this.matchClient,"matchh")

      this.getId=this.ids[this.clientsBank.indexOf(this.client)]

      console.log(this.getId,"Tomatchh")
      
      if(this.matchClient===this.getId){
        this.showsuccess('Project With The Client Is Selected ')
      }
      else{
        this.showerror('Project With The Non-Client Is Selected')
      }
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
  delete:'  ',
  update:" "
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
  idClient:string
  idRec:string
}

export interface entries {
  project:string;
  client:string
  receiver:string
  amount:string
  reason:string
  method:string
  remarks:string
  idClient:string
  idRec:string
}
