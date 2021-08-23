import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  newDivs:addDivisions[]=[];

  addNewDiv(){
 
    this.newDivs.push(new addDivisions());

  }

  constructor() { }

  ngOnInit(): void {
  }
  
 
 

}


export class addDivisions {
}