import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvestimentosService } from 'src/app/services/investimentos.service';

@Component({
  selector: 'app-listagem-investimentos',
  templateUrl: './listagem-investimentos.component.html',
  styleUrls: ['../../default.css']
})
export class ListagemInvestimentosComponent implements OnInit {

  investimentos = new MatTableDataSource<any>();
  displayColumns: string[];
  autoCompleteInput = new FormControl();
  usuarioId: string = localStorage.getItem('UsuarioId');
  opcoesInvestimentos: string[] = [];

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  constructor(
    private investimentosService: InvestimentosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.investimentosService.GetInvestimentoUserId(this.usuarioId).subscribe(result => {
      // result.forEach(investimentos => {
      //   this.opcoesAtivos.push(investimentos.ativo.sigla);
      // });

      this.investimentos.data = result;
      this.investimentos.paginator = this.paginator;
      this.investimentos.sort = this.sort;
    });

    this.displayColumns = this.viewColumns();
  }

  viewColumns(): string[]{
    return ['data', 'valor', 'acoes']
  }

  openDialog(investimentoId, valor): void {
    this.dialog.open(DialogDeleteInvestimentosComponent, {
      data: {
        investimentoId: investimentoId,
        valor: valor
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.investimentosService.GetInvestimentoUserId(this.usuarioId).subscribe(dados => {
          this.investimentos.data = dados;
          this.investimentos.paginator = this.paginator;
        });
        this.displayColumns = this.viewColumns();
      }
    });
  }

  // filterAnos(ano: number): number[] {
  //   if (ano >=2) {
  //     this.investimentosService.FilterInvestimento(ano).subscribe(result => {
  //       this.investimentos.data = result;
  //     });
  //   }
  //   else{
  //     if (ano === '') {
  //       this.investimentosService.GetInvestimentosUserId(this.usuarioId).subscribe(result => {
  //         this.investimentos.data = result;
  //       });
  //     }
  //     return this.opcoesAtivos.filter(ativo =>
  //       ativo.toLowerCase().includes(siglaAtivo.toLowerCase())
  //       );
  //     }
  //   }

}

@Component({
  selector: 'app-dialog-delete-investimentos',
  templateUrl: 'dialog-delete-investimentos.html'
})
export class DialogDeleteInvestimentosComponent{
  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private investimentosService: InvestimentosService,
    private snackBar: MatSnackBar
    ){ }

    deleteInvestimento(investimentoId): void {
      this.investimentosService.DeleteInvestimento(investimentoId).subscribe(result => {
        this.snackBar.open(result.mensagem, null, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      });
    }
  }
