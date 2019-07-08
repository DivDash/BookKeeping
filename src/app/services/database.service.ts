import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=Berlin&APPID=${environment.weatherMapApi}`);
  }
}
