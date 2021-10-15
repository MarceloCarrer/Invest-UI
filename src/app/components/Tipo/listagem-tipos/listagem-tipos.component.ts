import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TiposService } from 'src/app/services/tipos.service';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-listagem-tipos',
  templateUrl: './listagem-tipos.component.html',
  styleUrls: ['../../default.css']
})
export class ListagemTiposComponent implements OnInit {

  tipos = new MatTableDataSource<any>();
  displayColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesTipos: string[] = [];
  nomesTipos: Observable<string[]>;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  constructor(
    private tipoService: TiposService,
    private dialog: MatDialog
    ) { }

    ngOnInit(): void {
      this.tipoService.GetAllTipos().subscribe(result => {
        result.forEach((tipo) => {
          this.opcoesTipos.push(tipo.nome);
        });

        this.tipos.data = result;
        this.tipos.paginator = this.paginator;
        this.tipos.sort = this.sort;
      });

      this.displayColumns = this.viewColumns();

      this.nomesTipos = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.filterNames(nome)));
    }

    viewColumns(): string[]{
      return ['nome', 'sigla', 'codigo', 'acoes']
    }

    openDialog(tipoId, nome): void {
      this.dialog.open(DialogDeleteTiposComponent, {
        data: {
          tipoId: tipoId,
          nome: nome
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.tipoService.GetAllTipos().subscribe(dados => {
            this.tipos.data = dados;
          })
        }
      });

      this.displayColumns = this.viewColumns();
    }

    filterNames(nome: string): string[] {
      if (nome.trim().length >=2) {
        this.tipoService.FilterTipo(nome.toLowerCase()).subscribe(result => {
          this.tipos.data = result;
        });
      }
      else{
        if (nome === '') {
          this.tipoService.GetAllTipos().subscribe(result => {
            this.tipos.data = result;
          });
        }

        return this.opcoesTipos.filter(tipo =>
          tipo.toLowerCase().includes(nome.toLowerCase())
          );
        }
      }

    }

    @Component({
      selector: 'app-dialog-delete-tipos',
      templateUrl: 'dialog-delete-tipos.html'
    })
    export class DialogDeleteTiposComponent{
      constructor(
        @Inject (MAT_DIALOG_DATA) public data: any,
        private tipoService: TiposService,
        private snackBar: MatSnackBar
        ){ }

        deleteTipo(tipoId): void {
          this.tipoService.DeleteTipo(tipoId).subscribe(result => {
            this.snackBar.open(result.mensagem, null, {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom'
            });
          });
        }
      }
