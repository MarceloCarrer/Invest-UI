import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NgxMaskModule } from 'ngx-mask'
import { NgxCurrencyModule } from "ngx-currency";
import { ChartsModule } from 'ng2-charts';

import { JwtModule } from "@auth0/angular-jwt";

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TiposService } from './services/tipos.service';
import { AtivosService } from './services/ativos.service';
import { TransacoesService } from './services/transacoes.service'
import { InvestimentosService } from './services/investimentos.service'
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { MesService } from "./services/mes.service";
import { FuncoesService } from './services/funcoes.service';
import { UsuariosService } from './services/usuarios.service';
import { AuthGuardService } from './services/auth-guard.service';

import { ListagemTiposComponent, DialogDeleteTiposComponent } from './components/Tipo/listagem-tipos/listagem-tipos.component';
import { NovoTipoComponent } from './components/Tipo/novo-tipo/novo-tipo.component';
import { AtualizarTipoComponent } from './components/Tipo/atualizar-tipo/atualizar-tipo.component';

import { ListagemFuncoesComponent, DialogDeleteFuncoesComponent } from './components/Funcao/listagem-funcoes/listagem-funcoes.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';
import { AtualizarFuncaoComponent } from './components/Funcao/atualizar-funcao/atualizar-funcao.component';

import { ListagemAtivosComponent, DialogDeleteAtivosComponent } from './components/Ativo/listagem-ativos/listagem-ativos.component';
import { NovoAtivoComponent } from './components/Ativo/novo-ativo/novo-ativo.component';
import { AtualizarAtivoComponent } from './components/Ativo/atualizar-ativo/atualizar-ativo.component';

import { ListagemTransacoesComponent, DialogDeleteTransacoesComponent } from './components/Transacao/listagem-transacoes/listagem-transacoes.component';
import { NovaTransacaoComponent } from './components/Transacao/nova-transacao/nova-transacao.component';
import { AtualizarTransacaoComponent } from './components/Transacao/atualizar-transacao/atualizar-transacao.component';

import { ListagemInvestimentosComponent, DialogDeleteInvestimentosComponent } from './components/Investimento/listagem-investimentos/listagem-investimentos.component';
import { NovoInvestimentoComponent } from './components/Investimento/novo-investimento/novo-investimento.component';
import { AtualizarInvestimentoComponent } from './components/Investimento/atualizar-investimento/atualizar-investimento.component';

import { RegistrarUsuarioComponent } from './components/Usuario/Registro/registrar-usuario/registrar-usuario.component';
import { AtualizarUsuarioComponent } from './components/Usuario/atualizar-usuario/atualizar-usuario.component';
import { LoginUsuarioComponent } from './components/Usuario/Login/login-usuario/login-usuario.component';
import { HeaderComponent } from './components/Dashboard/header/header.component';

export function GetTokenUser(){
  return localStorage.getItem("TokenUsuarioLogado");
}

import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { IndexComponent } from './components/Dashboard/index/index.component';


registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    ListagemTiposComponent,
    DialogDeleteTiposComponent,
    NovoTipoComponent,
    AtualizarTipoComponent,
    ListagemFuncoesComponent,
    DialogDeleteFuncoesComponent,
    NovaFuncaoComponent,
    AtualizarFuncaoComponent,
    RegistrarUsuarioComponent,
    LoginUsuarioComponent,
    AtualizarUsuarioComponent,
    ListagemAtivosComponent,
    NovoAtivoComponent,
    AtualizarAtivoComponent,
    DialogDeleteAtivosComponent,
    HeaderComponent,
    DashboardComponent,
    ListagemTransacoesComponent,
    NovaTransacaoComponent,
    AtualizarTransacaoComponent,
    DialogDeleteTransacoesComponent,
    ListagemInvestimentosComponent,
    NovoInvestimentoComponent,
    AtualizarInvestimentoComponent,
    DialogDeleteInvestimentosComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule,
    NgxMaskModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: GetTokenUser,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes : []
      }

    }),
    NgxCurrencyModule.forRoot({
      align: "rigth",
      allowNegative: true,
      allowZero: true,
      decimal: ",",
      precision: 2,
      prefix: "R$ ",
      suffix: "",
      thousands: ".",
      nullable: true
    }),
  ],
  providers: [
    TiposService,
    AtivosService,
    TransacoesService,
    InvestimentosService,
    DashboardComponent,
    MesService,
    FuncoesService,
    UsuariosService,
    AuthGuardService,
    HttpClientModule,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
