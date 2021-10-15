import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcao } from '../models/Funcao';
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
  export class FuncoesService {

    url = environment.apiURL + 'api/Funcoes';

    constructor(private http: HttpClient) { }

    GetAllFuncoes() : Observable<Funcao[]>{
      return this.http.get<Funcao[]>(this.url);
    }

    GetFuncaoId(funcaoId: string) : Observable<Funcao>{
      const apiUrl = `${this.url}/${funcaoId}`;
      return this.http.get<Funcao>(apiUrl);
    }

    PostFuncao(funcao: Funcao) : Observable<any>{
      console.log(localStorage.getItem('TokenUsuarioLogado'));
      return this.http.post<Funcao>(this.url, funcao, httpOptions)
    }

    PutFuncao(funcaoId: string, funcao: Funcao) : Observable<any>{
      const apiUrl = `${this.url}/${funcaoId}`;
      return this.http.put<Funcao>(apiUrl, funcao, httpOptions);
    }

    DeleteFuncao(funcaoId: string) : Observable<any>{
      const apiUrl = `${this.url}/${funcaoId}`;
      return this.http.delete<string>(apiUrl, httpOptions);
    }

    FilterFuncao(nomeFuncao: string) : Observable<Funcao[]>{
      const apiUrl = `${this.url}/filtrarFuncao/${nomeFuncao}`;
      return this.http.get<Funcao[]>(apiUrl);
    }

  }
