import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from '../services/myservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name:string



  constructor(private router: Router,private http: HttpClient, private myservice:MyserviceService ) {
    // this.http
    //   .get( "http://localhost:5000/Getinfo",{
    //     withCredentials:true
    //   })
    this.myservice.getInfo()
      .subscribe(
        res => {console.log(res)
          this.name=res["name"]
        },
        err =>  {
          console.log( err )
          this.router.navigateByUrl('login')
        }
      );

   }

@Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }
  logout() {
    console.log("here at logout")
    this.myservice.logout()
      // .get( "http://localhost:5000/Logout",{
      //   withCredentials:true
      // })
      .subscribe(
        res => console.log(res),
        err =>  console.log( err )
      );
    this.router.navigateByUrl('login');
  }

}
