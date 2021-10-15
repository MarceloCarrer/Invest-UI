import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { TiposService } from 'src/app/services/tipos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-novo-tipo',
  templateUrl: './novo-tipo.component.html',
  styleUrls: ['../../default.css']
})
export class NovoTipoComponent implements OnInit {

  form: any;
  tipos: Tipo[];
  erros: string[];

  constructor(
    private tiposService: TiposService,
    private router : Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.erros = [];
    this.tiposService.GetAllTipos().subscribe(result => {
      this.tipos = result;
    });

    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      sigla: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      codigo: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  get property () {
    return this.form.controls;
  }

  sendForm(): void {
    const tipo = this.form.value;
    this.erros = [];
    this.tiposService.PostTipo(tipo).subscribe(result => {
      this.router.navigate(['tipos/listagemtipos']);
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
    this.router.navigate(['tipos/listagemtipos']);
  }

}
