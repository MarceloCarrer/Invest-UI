import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders (
    {
      'Content-Type' : 'application/json'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiURL + 'api/Dashboard';

    constructor(private http: HttpClient) { }

    GetDataCardDashboard(usuarioId: string) : Observable<any>{
      const apiUrl = `${this.url}/dadosCardsDashboard/${usuarioId}`;
      return this.http.get<any>(apiUrl);
    }

    GetDataYearForUserId(usuarioId: string, ano: number) : Observable<any>{
      const apiUrl =`${this.url}/dadosAnuaisUsuarioId/${usuarioId}/${ano}`;
      return this.http.get<any>(apiUrl);
    }
}
