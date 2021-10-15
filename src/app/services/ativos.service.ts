import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ativo } from '../models/Ativo';
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
  export class AtivosService {

    url = environment.apiURL + 'api/Ativos';

    constructor(
      private http: HttpClient
      ) { }

      GetAtivoId(ativoId: number) : Observable<Ativo>{
        const apiUrl = `${this.url}/${ativoId}`;
        return this.http.get<Ativo>(apiUrl);
      }

      GetAtivosUserId(usuarioId: string) : Observable<Ativo[]>{
        const apiUrl = `${this.url}/ativosUsuarioId/${usuarioId}`;
        return this.http.get<Ativo[]>(apiUrl);
      }

      PostAtivo(ativo: Ativo) : Observable<any>{
        return this.http.post<Ativo>(this.url, ativo, httpOptions)
      }

      PutAtivo(ativoId: number, ativo: Ativo) : Observable<any>{
        const apiUrl = `${this.url}/${ativoId}`;
        return this.http.put<Ativo>(apiUrl, ativo, httpOptions);
      }

      DeleteAtivo(ativoId: Ativo) : Observable<any>{
        const apiUrl = `${this.url}/${ativoId}`;
        return this.http.delete<number>(apiUrl, httpOptions);
      }

      FilterAtivos(nomeAtivo: string) : Observable<Ativo[]>{
        const apiUrl = `${this.url}/filtrarAtivos/${nomeAtivo}`;
        return this.http.get<Ativo[]>(apiUrl);
      }

    }
