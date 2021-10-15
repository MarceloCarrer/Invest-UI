import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AtivosService } from 'src/app/services/ativos.service';

@Component({
  selector: 'app-listagem-ativos',
  templateUrl: './listagem-ativos.component.html',
  styleUrls: ['../../default.css']
})
export class ListagemAtivosComponent implements OnInit {

  ativos = new MatTableDataSource<any>();
  displayColumns: string[];
  autoCompleteInput = new FormControl();
  usuarioId: string = localStorage.getItem('UsuarioId');
  opcoesAtivos: string[] = [];
  nomeAtivos: Observable<string[]>;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  constructor(
    private ativosService: AtivosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ativosService.GetAtivosUserId(this.usuarioId).subscribe(result => {
      this.ativos.data = result;
      this.ativos.paginator = this.paginator;
      this.ativos.sort = this.sort;
    });

    this.displayColumns = this.viewColumns();

    this.nomeAtivos = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.filterNames(nome)));
  }

  viewColumns(): string[]{
    return ['sigla', 'nome', 'setor', 'acoes']
  }

  openDialog(ativoId, nome): void {
    this.dialog.open(DialogDeleteAtivosComponent, {
      data: {
        ativoId: ativoId,
        nome: nome
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.ativosService.GetAtivosUserId(this.usuarioId).subscribe(dados => {
          this.ativos.data = dados;
          this.ativos.paginator = this.paginator;
        });
        this.displayColumns = this.viewColumns();
      }
    });
  }

  filterNames(nome: string): string[] {
    if (nome.trim().length >=2) {
      this.ativosService.FilterAtivos(nome.toLowerCase()).subscribe(result => {
        this.ativos.data = result;
      });
    }
    else{
      if (nome === '') {
        this.ativosService.GetAtivosUserId(this.usuarioId).subscribe(result => {
          this.ativos.data = result;
        });
      }

      return this.opcoesAtivos.filter(ativo =>
        ativo.toLowerCase().includes(nome.toLowerCase())
        );
      }
    }
}

@Component({
  selector: 'app-dialog-delete-ativos',
  templateUrl: 'dialog-delete-ativos.html'
})
export class DialogDeleteAtivosComponent{
  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private ativoService: AtivosService,
    private snackBar: MatSnackBar
    ){ }

    deleteAtivo(ativoId): void {
      this.ativoService.DeleteAtivo(ativoId).subscribe(result => {
        this.snackBar.open(result.mensagem, null, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      });
    }
  }
