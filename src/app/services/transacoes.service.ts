import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transacao } from "./../models/Transacao";
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
  export class TransacoesService {

    url = environment.apiURL + 'api/Transacoes';

    constructor(
      private http: HttpClient
      ) { }

      GetTransacaoId(transacaoId: number) : Observable<Transacao>{
        const apiUrl = `${this.url}/${transacaoId}`;
        return this.http.get<Transacao>(apiUrl);
      }

      GetTransacoesUserId(usuarioId: string): Observable<Transacao[]>{
        const apiUrl = `${this.url}/transacoesUsuarioId/${usuarioId}`;
        return this.http.get<Transacao[]>(apiUrl);
      }

      PostTransacao(transacao: Transacao) : Observable<any>{
        return this.http.post<Transacao>(this.url, transacao, httpOptions)
      }

      PutTransacao(transacaoId: number, transacao: Transacao) : Observable<any>{
        const apiUrl = `${this.url}/${transacaoId}`;
        return this.http.put<Transacao>(apiUrl, transacao, httpOptions);
      }

      DeleteTransacao(transacaoId: Transacao) : Observable<any>{
        const apiUrl = `${this.url}/${transacaoId}`;
        return this.http.delete<number>(apiUrl, httpOptions);
      }

      FilterTransacao(nomeAtivo: string) : Observable<Transacao[]>{
        const apiUrl = `${this.url}/filtrarTransacoes/${nomeAtivo}`;
        return this.http.get<Transacao[]>(apiUrl);
      }

      FilterVendido(vendido: boolean) : Observable<Transacao[]>{
        const apiUrl = `${this.url}/filtrarVendidos/${vendido}`;
        return this.http.get<Transacao[]>(apiUrl);
      }

    }
