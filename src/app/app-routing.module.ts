import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemTiposComponent } from './components/Tipo/listagem-tipos/listagem-tipos.component'
import { NovoTipoComponent } from './components/Tipo/novo-tipo/novo-tipo.component'
import { AtualizarTipoComponent } from './components/Tipo/atualizar-tipo/atualizar-tipo.component';

import { ListagemAtivosComponent } from './components/Ativo/listagem-ativos/listagem-ativos.component';
import { NovoAtivoComponent } from './components/Ativo/novo-ativo/novo-ativo.component';
import { AtualizarAtivoComponent } from './components/Ativo/atualizar-ativo/atualizar-ativo.component';

import { ListagemFuncoesComponent } from './components/Funcao/listagem-funcoes/listagem-funcoes.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';
import { AtualizarFuncaoComponent } from './components/Funcao/atualizar-funcao/atualizar-funcao.component';

import { ListagemTransacoesComponent } from './components/Transacao/listagem-transacoes/listagem-transacoes.component';
import { NovaTransacaoComponent } from './components/Transacao/nova-transacao/nova-transacao.component';
import { AtualizarTransacaoComponent } from './components/Transacao/atualizar-transacao/atualizar-transacao.component';

import { ListagemInvestimentosComponent } from './components/Investimento/listagem-investimentos/listagem-investimentos.component';
import { NovoInvestimentoComponent } from './components/Investimento/novo-investimento/novo-investimento.component';
import { AtualizarInvestimentoComponent } from './components/Investimento/atualizar-investimento/atualizar-investimento.component';

import { RegistrarUsuarioComponent } from './components/Usuario/Registro/registrar-usuario/registrar-usuario.component';
import { AtualizarUsuarioComponent } from './components/Usuario/atualizar-usuario/atualizar-usuario.component';
import { LoginUsuarioComponent } from './components/Usuario/Login/login-usuario/login-usuario.component';

import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { IndexComponent } from './components/Dashboard/index/index.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  {
    path : '', component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path : 'tipos/listagemtipos', component: ListagemTiposComponent
      },
      {
        path : 'tipos/novotipo', component: NovoTipoComponent
      },
      {
        path : 'tipos/atualizartipo/:id', component: AtualizarTipoComponent
      },
      {
        path : 'funcoes/listagemfuncoes', component: ListagemFuncoesComponent
      },
      {
        path : 'funcoes/novafuncao', component: NovaFuncaoComponent
      },
      {
        path : 'funcoes/atualizarfuncao/:id', component: AtualizarFuncaoComponent
      },
      {
        path : 'ativos/listagemativos', component:ListagemAtivosComponent
      },
      {
        path : 'ativos/novoativo', component: NovoAtivoComponent
      },
      {
        path : 'ativos/atualizarativo/:id', component: AtualizarAtivoComponent
      },
      {
        path : 'transacoes/listagemtransacoes', component: ListagemTransacoesComponent
      },
      {
        path : 'transacoes/novatransacao', component: NovaTransacaoComponent
      },
      {
        path : 'transacoes/atualizartransacao/:id', component: AtualizarTransacaoComponent
      },
      {
        path : 'investimentos/listageminvestimentos', component: ListagemInvestimentosComponent
      },
      {
        path : 'investimentos/novoinvestimento', component: NovoInvestimentoComponent
      },
      {
        path : 'investimentos/atualizarinvestimento/:id', component: AtualizarInvestimentoComponent
      },
      {
        path : 'usuarios/atualizarusuario', component: AtualizarUsuarioComponent
      },
      {
        path : 'dashboard/index', component: IndexComponent
      },

    ],
  },

  {
    path : 'usuarios/registrarusuario', component: RegistrarUsuarioComponent
  },
  {
    path : 'usuarios/loginusuario', component: LoginUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
