import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Investimento } from "./../models/Investimento";
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
  export class InvestimentosService {

    url = environment.apiURL + 'api/Investimentos';

    constructor(
      private http: HttpClient
      ) { }

      GetInvestimentoId(investimentoId: number) : Observable<Investimento>{
        const apiUrl = `${this.url}/${investimentoId}`;
        return this.http.get<Investimento>(apiUrl);
      }

      GetInvestimentoUserId(usuarioId: string): Observable<Investimento[]>{
        const apiUrl = `${this.url}/investimentosUsuarioId/${usuarioId}`;
        return this.http.get<Investimento[]>(apiUrl);
      }

      PostInvestimento(investimento: Investimento) : Observable<any>{
        return this.http.post<Investimento>(this.url, investimento, httpOptions)
      }

      PutInvestimento(investimentoId: number, investimento: Investimento) : Observable<any>{
        const apiUrl = `${this.url}/${investimentoId}`;
        return this.http.put<Investimento>(apiUrl, investimento, httpOptions);
      }

      DeleteInvestimento(investimentoId: Investimento) : Observable<any>{
        const apiUrl = `${this.url}/${investimentoId}`;
        return this.http.delete<number>(apiUrl, httpOptions);
      }

      FilterInvestimento(ano: number) : Observable<Investimento[]>{
        const apiUrl = `${this.url}/filtrarInvestimentos/${ano}`;
        return this.http.get<Investimento[]>(apiUrl);
      }

    }
