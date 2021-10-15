import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ativo } from 'src/app/models/Ativo';
import { AtivosService } from 'src/app/services/ativos.service';

@Component({
  selector: 'app-novo-ativo',
  templateUrl: './novo-ativo.component.html',
  styleUrls: ['../../default.css']
})
export class NovoAtivoComponent implements OnInit {

  form: any;
  ativo: Ativo;
  erros: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(
    private ativosService : AtivosService,
    private router : Router,
    private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
      this.erros = [];

      this.form = new FormGroup({
        nome: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        sigla: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
        setor: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
        usuarioId: new FormControl(this.usuarioId)
      });
    }

    get property () {
      return this.form.controls;
    }

    listReturn(): void {
      this.router.navigate(['ativos/listagemativos']);
    }

    sendForm(): void {
      this.erros = [];
      const ativo = this.form.value;

      this.ativosService.PostAtivo(ativo).subscribe(result => {
        this.router.navigate(['ativos/listagemativos']);
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
