import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name:string



  constructor(private router: Router,private http: HttpClient ) {
    console.log("here at get")
    this.http
      .get( "http://localhost:5000/Getinfo",{
        withCredentials:true
      })
      .subscribe(
        res => {console.log(res)
          this.name=res["name"]
        },
        err =>  console.log( err )
      );

   }

@Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }
  logout() {
    this.router.navigateByUrl('login');
  }

}
