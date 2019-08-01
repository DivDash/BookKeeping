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

  // Creates document with element
  // TODO: Handle error if no internet
  async createDocument(name: string, element: object) {
    return await new Promise((resolve, reject) =>
    this.http.post(`${serverUrl}/${name}/create-${name}`, element)
    .subscribe(resolve, reject));
  }

  // Updates document of provided id with element
  // TODO: Handle error if no internet
  async updateDocument(name: string, id: string, element: object) {
    return await new Promise((resolve, reject) =>
    this.http.put(`${serverUrl}/${name}/update-${name}/${id}`, element)
    .subscribe(resolve, reject));
  }

  // Delete document using id
  // TODO: Handle error if no internet
  // Also depends on whether internet was available when object was created
  async deleteDocument(name: string, id: string) {
    return await new Promise((resolve, reject) =>
    this.http.delete(`${serverUrl}/${name}/delete-${name}/${id}`)
    .subscribe(resolve, reject));
  }

}
