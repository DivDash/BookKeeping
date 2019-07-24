import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';

import { User } from './helper-classes';


const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(
      private storage: Storage,
      private plt: Platform,
      private http: HttpClient
    ) {
      this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login(email: string, password: string) {
    return new Promise(async (resolve, reject) => {

      // this.users.push(user);
      console.log(email);
      console.log(password);

      // To internet
      this.http.post('http://localhost:4001/user-management/login/', {
        email,
        password
      })
      .subscribe(async resp => {
        resolve(resp as User);

        this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
          this.authenticationState.next(true);
        });



        // Save object to local cache
        // try {
        //   await Storage.set({
        //     key: 'users',
        //     value: JSON.stringify(this.users)
        //   });
        // } catch (err) {
        //   reject(new Error('Error while adding user in local storage.'));
        //   return;
        // }
      }, async error => {
        // TODO: if error === not connected
        // Save object to local cache
        console.log(error);
      });
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      console.log(this.storage.get(TOKEN_KEY));
      this.authenticationState.next(false);
    });
  }

  register(user: User) {
    return new Promise<User>(async (resolve, reject) => {

      // To internet
      // console.log(user);
      this.http.post('http://localhost:4001/user-management/sign-up/', user)
      .subscribe(async resp => {
        resolve(resp as User);

        this.storage.set(TOKEN_KEY, 'Bearer 123456').then(res => {
          this.authenticationState.next(true);
        });


        // Save object to local cache
        // try {
        //   await Storage.set({
        //     key: 'users',
        //     value: JSON.stringify(this.users)
        //   });
        // } catch (err) {
        //   reject(new Error('Error while adding user in local storage.'));
        //   return;
        // }
      }, async error => {
        // TODO: if error === not connected
        // Save object to local cache
        console.log(error);
        // try {
        //   await Storage.set({
        //     key: 'users',
        //     value: JSON.stringify(this.users)
        //   });
        // } catch (err) {
        //   reject(new Error('Error while adding project in local storage.'));
        //   return;
        // }
      });
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }



}
