import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Funcao } from 'src/app/models/Funcao';
import { FuncoesService } from 'src/app/services/funcoes.service';

@Component({
  selector: 'app-nova-funcao',
  templateUrl: './nova-funcao.component.html',
  styleUrls: ['../../default.css']
})
export class NovaFuncaoComponent implements OnInit {

  form: any;
  funcoes: Funcao[];
  erros: string[];

  constructor(
    private funcoesService : FuncoesService,
    private router : Router,
    private snackBar: MatSnackBar)
    { }

    ngOnInit(): void {
      this.erros = [];
      this.funcoesService.GetAllFuncoes().subscribe(result => {
        this.funcoes = result;
      });

      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        descricao: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)])
      });
    }

    get property () {
      return this.form.controls;
    }

    sendForm(): void {
      const funcao = this.form.value;
      this.erros = [];
      this.funcoesService.PostFuncao(funcao).subscribe(result => {
        this.router.navigate(['funcoes/listagemfuncoes']);
        this.snackBar.open(result.mensagem, null, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      },
      (err => {
        if (err.status === 400) {
          for (const campo in err.error.errors) {
            if (err.error.errors.hasOwnProperty(campo)) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        }
        console.log(err);
      }));
    }

    listReturn(): void {
      this.router.navigate(['funcoes/listagemfuncoes']);
    }
  }
