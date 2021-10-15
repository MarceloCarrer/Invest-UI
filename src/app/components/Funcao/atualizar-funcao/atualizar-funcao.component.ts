import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Funcao } from 'src/app/models/Funcao';
import { FuncoesService } from 'src/app/services/funcoes.service';

@Component({
  selector: 'app-atualizar-funcao',
  templateUrl: './atualizar-funcao.component.html',
  styleUrls: ['../../default.css']
})
export class AtualizarFuncaoComponent implements OnInit {
  nomeFuncao: string;
  funcaoId: string;
  funcao: Observable<Funcao>;
  form: any;
  erros: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private funcaoService: FuncoesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.funcaoId = this.route.snapshot.params.id;

    this.funcaoService.GetFuncaoId(this.funcaoId).subscribe(result => {
      this.nomeFuncao = result.name;
      this.form = new FormGroup({
        id: new FormControl(result.id),
        name: new FormControl(result.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        descricao: new FormControl(result.descricao, [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
      });
    });
  }

  get property () {
    return this.form.controls;
  }

  listReturn(): void {
    this.router.navigate(['funcoes/listagemfuncoes']);
  }

  sendForm(): void {
    const funcao = this.form.value;
    this.erros = [];
    this.funcaoService.PutFuncao(this.funcaoId, funcao).subscribe(result => {
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

}
