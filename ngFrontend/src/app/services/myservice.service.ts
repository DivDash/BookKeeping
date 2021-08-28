import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountModel } from '../AccountModel';


const baseUrl="http://localhost:5000";
@Injectable({
  providedIn: 'root'
})

export class MyserviceService {
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
    return this.http.get<any>(`${baseUrl}/viewAccount`, {
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
    return this.http.get<any>(`${baseUrl}/GetInfo`, {
      withCredentials: true
    } );
  }

  loginAdmin(data):  Observable<any> {
    return this.http.post<any>(`${baseUrl}/signin`, data, {
      withCredentials: true
    } );
  }

  registerAdmin(data):  Observable<any> {
    return this.http.post<any>(`${baseUrl}/registration`,data);
  }
  constructor(private http: HttpClient) { }


}
