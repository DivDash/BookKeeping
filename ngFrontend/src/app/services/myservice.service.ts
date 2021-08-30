import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AccountModel } from '../AccountModel';
import { NonProfitModel } from '../NonProfitModel';
import { Socket } from 'ngx-socket-io';

const baseUrl="http://localhost:5000";
@Injectable({
  providedIn: 'root'
})

export class MyserviceService {
  viewAccountNonProfit()  :  Observable<any> {
    return this.http.get<any>(`${baseUrl}/viewaccountnonprofit`, {
      withCredentials: true
    } );
  }
  createAccountNonProfit(NonProfitModel)  :  Observable<any> {
    return this.http.post<any>(`${baseUrl}/accountnonprofit`, NonProfitModel,{
      withCredentials: true
    } );
  }
  createProfitModel(ProfitModel)  :  Observable<any> {
    return this.http.post<any>(`${baseUrl}/Profit`, ProfitModel,{
      withCredentials: true
    } );
  }
  createAccount(AccountModel)  :  Observable<any> {
    return this.http.post<any>(`${baseUrl}/account`, AccountModel ,{
      withCredentials: true
    } );
  }
  viewEntry(data)  :  Observable<any> {
    return this.http.post<any>(`${baseUrl}/viewProfit`, data, {
      withCredentials: true
    } );
  }
  viewAccount() :  Observable<any> {
    return this.http.get<any>(`${baseUrl}/viewaccount`, {
      withCredentials: true
    } );
  }


  viewProfit() :  Observable<any> {
    return this.http.get<any>(`${baseUrl}/viewProfit`, {
      withCredentials: true
    } );
  }

  logout() :  Observable<any> {
    return this.http.get<any>(`${baseUrl}/logout`, {
      withCredentials: true
    } );
  }

  getInfo():  Observable<any> {
    return this.http.get<any>(`${baseUrl}/Getinfo`, {
      withCredentials: true
    } );
  }

  loginAdmin(data):  Observable<any> {
    console.log(data)
    return this.http.post<any>(`${baseUrl}/signin`, data);
  }

  registerAdmin(data):  Observable<any> {
    return this.http.post<any>(`${baseUrl}/registration`,data);
  }

  getLiveCollection(name: string): Observable<Array<any>> {
    // Particular behavior for particular document
    // Using Subject instead of BehaviorSubject because we don't need older values
    const collectionBehavior = new Subject<Array<any>>();
    // Setup get from server
    this.http.get(`${baseUrl}/${name}`).subscribe(resp => {
      // For any further changes in server - specific to this document (name)
      this.socket.on(`${name}-data`, data => {
        collectionBehavior.next(data);
      });
      collectionBehavior.next(resp as Array<any>);
    });
    return collectionBehavior;
  }
  constructor(private http: HttpClient,private socket: Socket) { }


}
