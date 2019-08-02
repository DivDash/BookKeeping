import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from './helper-classes';

import { Plugins } from '@capacitor/core';
import { ServerService } from './server.service';
const { Storage } = Plugins;


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  user: User;

  constructor(
      private server: ServerService
    ) {
  }

  async login(email: string, password: string) {
    try {
      const response = await this.server.signIn(email, password);
      // Create user
      this.user = new User(email, response.name, response.role);
      // Safe to move forward
      this.authenticationState.next(true);
      // Store token and user locally
      await Storage.set({
        key: TOKEN_KEY,
        value: response.token
      });
      await Storage.set({
        key: USER_KEY,
        value: JSON.stringify(this.user)
      });
    } catch (error) {
      // TODO: Show login error
    }
  }

  async logout() {
    this.authenticationState.next(false);
    await Storage.remove({key: TOKEN_KEY});
    await Storage.remove({key: USER_KEY});
  }

  async register(user: User, password: string) {
    try {
      const response = await this.server.signUp(user, password);
      // Set user
      this.user = user;
      // Safe to move forward
      this.authenticationState.next(true);
      // Store token and user locally
      await Storage.set({
        key: TOKEN_KEY,
        value: response.token
      });
      await Storage.set({
        key: USER_KEY,
        value: JSON.stringify(this.user)
      });
    } catch (error) {
      // TODO: Show registration error
    }
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    return Storage.get({key: TOKEN_KEY}).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

}
