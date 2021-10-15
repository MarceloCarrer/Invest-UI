import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tipo } from 'src/app/models/Tipo';
import { TiposService } from 'src/app/services/tipos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-atualizar-tipo',
  templateUrl: './atualizar-tipo.component.html',
  styleUrls: ['../../default.css']
})
export class AtualizarTipoComponent implements OnInit {
  
  nomeTipo: string;
  tipoId: number;
  tipo: Observable<Tipo>;
  form: any;
  erros: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tipoService: TiposService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.tipoId = this.route.snapshot.params.id;

    this.tipoService.GetTipoId(this.tipoId).subscribe(result => {
      this.nomeTipo = result.nome;
      this.form = new FormGroup({
        tipoId: new FormControl(result.tipoId),
        nome: new FormControl(result.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        sigla: new FormControl(result.sigla, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
        codigo: new FormControl(result.codigo, [Validators.required, Validators.min(1)])
      });
    });
  }

  get property () {
    return this.form.controls;
  }

  listReturn(): void {
    this.router.navigate(['tipos/listagemtipos']);
  }

  sendForm(): void {
    const tipo = this.form.value;
    this.erros = [];
    this.tipoService.PutTipo(this.tipoId, tipo).subscribe(result => {
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
}
