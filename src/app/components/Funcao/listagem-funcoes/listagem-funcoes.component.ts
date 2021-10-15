import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FuncoesService } from 'src/app/services/funcoes.service';

@Component({
  selector: 'app-listagem-funcoes',
  templateUrl: './listagem-funcoes.component.html',
  styleUrls: ['../../default.css']
})
export class ListagemFuncoesComponent implements OnInit {

  funcoes = new MatTableDataSource<any>();
  displayColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesFuncoes: string[] = [];
  nomesFuncoes: Observable<string[]>;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  constructor(
    private funcoesService: FuncoesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.funcoesService.GetAllFuncoes().subscribe(result => {
      result.forEach((funcao) => {
        this.opcoesFuncoes.push(funcao.name);
      })

      this.funcoes.data = result;
      this.funcoes.sort = this.sort;
      this.funcoes.paginator = this.paginator;
    });

    this.displayColumns = this.viewColumns();

    this.nomesFuncoes = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.filterNames(nome)));
  }

  viewColumns(): string[]{
    return ['nome', 'descricao', 'acoes']
  }

  openDialog(funcaoId, nome): void {
    this.dialog.open(DialogDeleteFuncoesComponent, {
      data: {
        funcaoId: funcaoId,
        nome: nome
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.funcoesService.GetAllFuncoes().subscribe(dados => {
          this.funcoes.data = dados;
        });
      }
    });

    this.displayColumns = this.viewColumns();
  }

  filterNames(nome: string): string[] {
    if (nome.trim().length >=2) {
      this.funcoesService.FilterFuncao(nome.toLowerCase()).subscribe(result => {
        this.funcoes.data = result;
      });
    }
    else{
      if (nome === '') {
        this.funcoesService.GetAllFuncoes().subscribe(result => {
          this.funcoes.data = result;
        });
      }

      return this.opcoesFuncoes.filter(funcao =>
        funcao.toLowerCase().includes(nome.toLowerCase())
        );
      }
    }

  }

  @Component({
    selector: 'app-dialog-delete-funcoes',
    templateUrl: 'dialog-delete-funcoes.html'
  })
  export class DialogDeleteFuncoesComponent{
    constructor(
      @Inject (MAT_DIALOG_DATA) public data: any,
      private funcoesService: FuncoesService,
      private snackBar: MatSnackBar
      ){ }

      deleteFuncao(funcaoId): void {
        this.funcoesService.DeleteFuncao(funcaoId).subscribe(result => {
          this.snackBar.open(result.mensagem, null, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
        });
      }
    }
