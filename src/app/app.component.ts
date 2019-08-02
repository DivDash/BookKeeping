import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit() { }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeAuthentication();
    });
  }

  initializeAuthentication() {
    this.authService.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['members']);
      } else {
        this.router.navigate(['login']);
      }
    });
    this.authService.checkToken();
  }
}
