import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { isDefined } from '@angular/compiler/src/util';

const baseUrl = environment.baseUrl;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    console.log('here at GETINFOOO');
    let token_value = cookieService.get('Book');
    // let token=cookieService.get('Value')
    if (!token_value) {
      this.router.navigateByUrl('login');
    }
    // this.http
    //   .get(`${baseUrl}/Getinfo`, {
    //     withCredentials: true,
    //   })
    //   .subscribe(
    //     (res) => {
    //       console.log('EFSHAAL', res);
    //       this.name = res['name'];
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.router.navigateByUrl('login');
    //     }
    //   );
  }

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout() {
    console.log('here at logout');
    this.cookieService.deleteAll();
    //   this.http
    //     .get(`${baseUrl}/Logout`, {
    //       withCredentials: true,
    //     })
    //     .subscribe(
    //       (res) => console.log(res),
    //       (err) => console.log(err)
    //     );
    this.router.navigateByUrl('login');
  }
}
