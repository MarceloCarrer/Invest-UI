import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../../default.css']
})
export class IndexComponent implements OnInit {

  investimentoTotal: number;
  retornoTotal: number;
  lucroTotal: number;
  retornoPorc: number;
  usuarioId: string = localStorage.getItem('UsuarioId');
  anoAtual: number = new Date().getFullYear();
  anoInicial: number = 2000;
  anos: number[];

  dados: ChartDataSets[];
  labels: Label[];
  opcoes = {
    responsive: true,
    legend: {
      labels: {
        usePointStyle: true
      }
    }
  };
  plugins = [];
  tipo = 'line';

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.GetDataCardDashboard(this.usuarioId).subscribe(result => {
      this.investimentoTotal = result.investimentoTotal;
      this.retornoTotal = result.retornoTotal;
      this.lucroTotal = result.lucroTotal;
      this.retornoPorc = result.retornoPorc;
    });

    this.anos = this.LoadYears(this.anoInicial, this.anoAtual);

    this.dashboardService.GetDataYearForUserId(this.usuarioId, this.anoAtual).subscribe(result => {
      this.labels = this.GetMeses(result.meses);

      this.dados = [
        {
          data: this.TransacoesVendas(result.meses, result.vendas),
          label: 'Vendas R$',
          fill: false,
          borderColor: '#27ae60',
          backgroundColor: '#27ae60',
          pointBackgroundColor: '#27ae60',
          pointBorderColor: '#27ae60',
          pointHoverBackgroundColor: '#27ae60',
          pointHoverBorderColor: '#27ae60',
        },
        {
          data: this.TransacoesCompras(result.meses, result.compras),
          label: 'Compras R$',
          fill: false,
          borderColor: '#c0392b',
          backgroundColor: '#c0392b',
          pointBackgroundColor: '#c0392b',
          pointBorderColor: '#c0392b',
          pointHoverBackgroundColor: '#c0392b',
          pointHoverBorderColor: '#c0392b',
        }
      ];
    });
  }

  LoadYears(anoInicial, anoAtual) : number[]{
    const anos = [];

    while(anoInicial <= anoAtual){
      anos.push(anoInicial);
      anoInicial++;
    }
    
    return anos;
  }

  GetMeses(dadosMeses: any) : string[]{
    const meses = [];
    let indice = 0;
    const qtdMeses = dadosMeses.length;

    while(indice < qtdMeses){
      meses.push(dadosMeses[indice].nome);
      indice++;
    }
    return meses;
  }

  TransacoesVendas(dadosMeses: any, dadosVendas: any) : number[] {
    const valores = [];
    let indiceMeses = 0;
    let indiceVendas = 0;
    const qtdMeses = dadosMeses.length;
    const qtdVendas = dadosVendas.length;
    let a = 0;

    while(indiceMeses <= qtdMeses - 1) {
      if (indiceVendas <= qtdVendas - 1) {
        if (dadosVendas[indiceVendas].mesId === dadosMeses[indiceMeses].mesId) {
          valores.push(dadosVendas[indiceVendas].valores);
          indiceVendas++;
          indiceMeses++;
        }
        else {
          valores.push(0);
          indiceMeses++;
        }
      }
      else {
        valores.push(0);
        indiceMeses++;
      }
    }
    return valores;
  }

  TransacoesCompras(dadosMeses: any, dadosCompras: any) : number[] {
    const valores = [];
    let indiceMeses = 0;
    let indiceCompras = 0;
    const qtdMeses = dadosMeses.length;
    const qtdCompras = dadosCompras.length;
    while(indiceMeses <= qtdMeses -1) {
      if (indiceCompras <= qtdCompras -1) {
        if (dadosCompras[indiceCompras].mesId === dadosMeses[indiceMeses].mesId) {
          valores.push(dadosCompras[indiceCompras].valores);
          indiceCompras++;
          indiceMeses++;
        }
        else {
          valores.push(0);
          indiceMeses++;
        }
      }
      else {
        valores.push(0);
        indiceMeses++;
      }
    }
    return valores;
  }

  LoadData(anoSelecionado: number) : void {
    this.dashboardService.GetDataYearForUserId(this.usuarioId, anoSelecionado).subscribe(result => {
      this.labels = this.GetMeses(result.meses);

      this.dados = [
        {
          data: this.TransacoesVendas(result.meses, result.vendas),
          label: 'Vendas R$',
          fill: false,
          borderColor: '#27ae60',
          backgroundColor: '#27ae60',
          pointBackgroundColor: '#27ae60',
          pointBorderColor: '#27ae60',
          pointHoverBackgroundColor: '#27ae60',
          pointHoverBorderColor: '#27ae60',
        },
        {
          data: this.TransacoesCompras(result.meses, result.compras),
          label: 'Compras R$',
          fill: false,
          borderColor: '#c0392b',
          backgroundColor: '#c0392b',
          pointBackgroundColor: '#c0392b',
          pointBorderColor: '#c0392b',
          pointHoverBackgroundColor: '#c0392b',
          pointHoverBorderColor: '#c0392b',
        }
      ];
    });
  }
}
