import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

// import {baseUrl} from environments
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class MyserviceService {
  headername: string;
  setheadername(name) {
    this.headername = name;
    console.log('INSERVEICE: ', this.headername);
  }
  getheadername() {
    console.log('INSERVEICE  GET: ', this.headername);
    return this.headername;
  }

  viewAccount(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/viewaccount`, {
      withCredentials: true,
    });
  }

  deleteAccount(data): Observable<any> {
    console.log(data.name, 'at service');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.http.delete<any>(`${baseUrl}/deleteaccount`, options);
  }

  deleteProfitProject(data): Observable<any> {
    console.log(data.name, 'at service');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.http.delete<any>(`${baseUrl}/deleteprofit`, options);
  }

  deleteEntry(data): Observable<any> {
    console.log(data.name, 'at service');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.http.delete<any>(`${baseUrl}/deleteentry`, options);
  }

  deleteNonProfit(data): Observable<any> {
    console.log(data, 'at service');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.http.delete<any>(`${baseUrl}/deletenonprofit`, options);
  }

  update_account(data): Observable<any> {
    console.log(data.name, 'at service');
    return this.http.post<any>(`${baseUrl}/updateaccount`, data, {
      withCredentials: true,
    });

    // return this.http.post<any>(`${baseUr.l}/updateacc.ount`, options);
  }
  update_profit_account(data): Observable<any> {
    console.log(data.name, 'at service');
    return this.http.post<any>(`${baseUrl}/updateprofitaccount`, data, {
      withCredentials: true,
    });

    // return this.http.post<any>(`${baseUr.l}/updateacc.ount`, options);
  }

  update_nonprofit_account(data): Observable<any> {
    console.log(data.name, 'at service');
    return this.http.post<any>(`${baseUrl}/updatenonprofitaccount`, data, {
      withCredentials: true,
    });

    // return this.http.post<any>(`${baseUr.l}/updateacc.ount`, options);
  }
  update_journal_account(data): Observable<any> {
    console.log(data.name, 'at service');
    return this.http.post<any>(`${baseUrl}/updatejournalaccount`, data, {
      withCredentials: true,
    });

    // return this.http.post<any>(`${baseUr.l}/updateacc.ount`, options);
  }

  createAccountNonProfit(NonProfitModel): Observable<any> {
    return this.http.post<any>(
      `${baseUrl}/createaccountnonprofit`,
      NonProfitModel,
      {
        withCredentials: true,
      }
    );
  }
  createProfitModel(ProfitModel): Observable<any> {
    return this.http.post<any>(`${baseUrl}/createaccountprofit`, ProfitModel, {
      withCredentials: true,
    });
  }
  createAccount(AccountModel): Observable<any> {
    return this.http.post<any>(`${baseUrl}/account`, AccountModel, {
      withCredentials: true,
    });
  }

  viewEntry(data): Observable<any> {
    console.log(data, 'from service');
    return this.http.post<any>(`${baseUrl}/viewentry`, data, {
      withCredentials: true,
    });
  }

  createEntry(data): Observable<any> {
    return this.http.post<any>(`${baseUrl}/createentries`, data, {
      withCredentials: true,
    });
  }

  viewProfit(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/viewaccountprofit`, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/Logout`, {
      withCredentials: true,
    });
  }

  getInfo(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/GetInfo`, {
      withCredentials: true,
    });
  }

  loginAdmin(data): Observable<any> {
    return this.http.post<any>(`${baseUrl}/signin`, data, {
      withCredentials: true,
    });
  }

  registerAdmin(data): Observable<any> {
    return this.http.post<any>(`${baseUrl}/registration`, data);
  }
  getLiveCollection(name: string): Observable<Array<any>> {
    // Particular behavior for particular document
    // Using Subject instead of BehaviorSubject because we don't need older values
    const collectionBehavior = new Subject<Array<any>>();
    // Setup get from server
    this.http.get(`${baseUrl}/${name}`).subscribe((resp) => {
      // For any further changes in server - specific to this document (name)
      this.socket.on(`${name}-data`, (data) => {
        collectionBehavior.next(data);
      });
      collectionBehavior.next(resp as Array<any>);
    });
    console.log('collection behaviour', collectionBehavior);

    return collectionBehavior;
  }
  getLiveCollectionPost(name: string, data1: any): Observable<Array<any>> {
    console.log('hhhh');
    // Particular behavior for particular document
    // Using Subject instead of BehaviorSubject because we don't need older values
    const collectionBehavior = new Subject<Array<any>>();
    // Setup get from server
    let params = new HttpParams().set('project', data1.project);
    this.http.get(`${baseUrl}/${name}`, { params }).subscribe((resp) => {
      // For any further changes in server - specific to this document (name)
      this.socket.on(`${name}-data`, (data) => {
        collectionBehavior.next(data);
      });
      collectionBehavior.next(resp as Array<any>);
    });
    console.log('collection behaviour', collectionBehavior);
    return collectionBehavior;
  }
  constructor(
    private http: HttpClient,
    private socket: Socket,
    private router: ActivatedRoute
  ) {}
}
