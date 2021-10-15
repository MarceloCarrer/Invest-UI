import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosRegistro} from '../models/DadosRegistro';
import { DadosLogin} from '../models/DadosLogin';
import { AtualizarUsuario} from '../models/AtualizarUsuario';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders (
    {
      'Content-Type' : 'application/json'
    })
  };

const httpOptionsUpdate = {
  headers: new HttpHeaders (
    {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
    })
  };

    @Injectable({
      providedIn: 'root'
    })
    export class UsuariosService {

      url = environment.apiURL + 'api/Usuarios';

      constructor(private http: HttpClient) { }

      SalvarFoto(formData: any): Observable<any> {
        const apiUrl = `${this.url}/salvarFoto`;
        return this.http.post<any>(apiUrl, formData);
      }

      RegistrarUsuario(dadosRegistro: DadosRegistro): Observable<any>{
        const apiUrl = `${this.url}/registrarUsuario`;
        return this.http.post<DadosRegistro>(apiUrl, dadosRegistro, httpOptions);
      }

      LogarUsuario(dadosLogin: DadosLogin): Observable<any>{
        const apiUrl = `${this.url}/logarUsuario`;
        return this.http.post<DadosLogin>(apiUrl, dadosLogin, httpOptions);
      }

      GetUserForId(id: string) : Observable<AtualizarUsuario>{
        const apiUrl = `${this.url}/${id}`;
        return this.http.get<AtualizarUsuario>(apiUrl);
      }

      PutUser(atualizarUsuario: AtualizarUsuario) : Observable<any>{
        const apiUrl = `${this.url}/atualizarUsuario`;
        return this.http.put<AtualizarUsuario>(apiUrl, atualizarUsuario, httpOptionsUpdate);
      }
    }
