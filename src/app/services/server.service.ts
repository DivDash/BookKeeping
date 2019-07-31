import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';

const { serverUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

  getLiveCollection(name: string): Observable<Array<any>> {
    // Particular behavior for particular document
    // Using Subject instead of BehaviorSubject because we don't need older values
    const collectionBehavior = new Subject<Array<any>>();
    // Setup get from server
    this.http.get(`${serverUrl}/${name}`).subscribe(resp => {
      // For any further changes in server - specific to this document (name)
      this.socket.on(`${name}-data`, data => {
        collectionBehavior.next(data);
      });
      collectionBehavior.next(resp as Array<any>);
    });
    return collectionBehavior;
  }
}
