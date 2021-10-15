import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mes } from './../models/Mes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesService {

  url = environment.apiURL + 'api/Meses';

  constructor(
    private http: HttpClient
  ) { }

  GetAllMeses(): Observable<Mes[]>{
    return this.http.get<Mes[]>(this.url);
  }
}
