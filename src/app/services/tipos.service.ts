import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../models/Tipo';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders (
    {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
    })
  };

  @Injectable({
    providedIn: 'root'
  })
  export class TiposService {

    url = environment.apiURL + 'api/Tipos';

    constructor(private http: HttpClient) { }

    GetAllTipos() : Observable<Tipo[]>{
      return this.http.get<Tipo[]>(this.url);
    }

    GetTipoId(tipoId: number) : Observable<Tipo>{
      const apiUrl = `${this.url}/${tipoId}`;
      return this.http.get<Tipo>(apiUrl);
    }

    PostTipo(tipo: Tipo) : Observable<any>{
      return this.http.post<Tipo>(this.url, tipo, httpOptions)
    }

    PutTipo(tipoId: number, tipo: Tipo) : Observable<any>{
      const apiUrl = `${this.url}/${tipoId}`;
      return this.http.put<Tipo>(apiUrl, tipo, httpOptions);
    }

    DeleteTipo(tipoId: Tipo) : Observable<any>{
      const apiUrl = `${this.url}/${tipoId}`;
      return this.http.delete<number>(apiUrl, httpOptions);
    }

    FilterTipo(nomeTipo: string) : Observable<Tipo[]>{
      const apiUrl = `${this.url}/filtrarTipo/${nomeTipo}`;
      return this.http.get<Tipo[]>(apiUrl);
    }
  }
