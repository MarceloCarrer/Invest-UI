import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TransacoesService } from 'src/app/services/transacoes.service';

@Component({
  selector: 'app-listagem-transacoes',
  templateUrl: './listagem-transacoes.component.html',
  styleUrls: ['../../default.css']
})
export class ListagemTransacoesComponent implements OnInit {

  transacoes = new MatTableDataSource<any>();
  displayColumns: string[];
  autoCompleteInput = new FormControl();
  usuarioId: string = localStorage.getItem('UsuarioId');
  opcoesAtivos: string[] = [];
  opcoesVendidas: boolean[] = [];
  nomeAtivo: Observable<string[]>;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  constructor(
    private transacoesService: TransacoesService,
    private dialog: MatDialog
    ) { }

    ngOnInit(): void {
      this.transacoesService.GetTransacoesUserId(this.usuarioId).subscribe(result => {
        result.forEach(transacao => {
          this.opcoesAtivos.push(transacao.ativo.sigla);
        });

        this.transacoes.data = result;
        this.transacoes.paginator = this.paginator;
        this.transacoes.sort = this.sort;
      });

      this.displayColumns = this.viewColumns();

      this.nomeAtivo = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.filterNames(nome)));
    }

    viewColumns(): string[]{
      return ['ativo', 'dataCompra', 'dataVenda', 'qtdCompra', 'valorCompra', 'valorVenda','vendido', 'acoes']
    }

    openDialog(transacaoId, ativoTransacao, tipoTransacao): void {
      this.dialog.open(DialogDeleteTransacoesComponent, {
        data: {
          transacaoId: transacaoId,
          ativoTransacao: ativoTransacao,
          tipoTransacao: tipoTransacao
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.transacoesService.GetTransacoesUserId(this.usuarioId).subscribe(dados => {
            this.transacoes.data = dados;
            this.transacoes.paginator = this.paginator;
          });
          this.displayColumns = this.viewColumns();
        }
      });
    }

    filterNames(siglaAtivo: string): string[] {
      if (siglaAtivo.trim().length >=2) {
        this.transacoesService.FilterTransacao(siglaAtivo.toLowerCase()).subscribe(result => {
          this.transacoes.data = result;
        });
      }
      else{
        if (siglaAtivo === '') {
          this.transacoesService.GetTransacoesUserId(this.usuarioId).subscribe(result => {
            this.transacoes.data = result;
          });
        }
        return this.opcoesAtivos.filter(ativo =>
          ativo.toLowerCase().includes(siglaAtivo.toLowerCase())
          );
        }
      }
    }

    @Component({
      selector: 'app-dialog-delete-transacoes',
      templateUrl: 'dialog-delete-transacoes.html'
    })
    export class DialogDeleteTransacoesComponent{
      constructor(
        @Inject (MAT_DIALOG_DATA) public data: any,
        private transacoesService: TransacoesService,
        private snackBar: MatSnackBar
        ){ }

        deleteTransacao(transacaoId): void {
          this.transacoesService.DeleteTransacao(transacaoId).subscribe(result => {
            this.snackBar.open(result.mensagem, null, {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom'
            });
          });
        }
      }
