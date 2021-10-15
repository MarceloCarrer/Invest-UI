import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ativo } from 'src/app/models/Ativo';
import { AtivosService } from 'src/app/services/ativos.service';

@Component({
  selector: 'app-atualizar-ativo',
  templateUrl: './atualizar-ativo.component.html',
  styleUrls: ['../../default.css']
})
export class AtualizarAtivoComponent implements OnInit {

  nomeAtivo: string;
  ativoId: number;
  ativo: Observable<Ativo>;
  form: any;
  erros: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(
    private ativosService: AtivosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
      this.erros = [];
      this.ativoId = this.route.snapshot.params.id;

      this.ativosService.GetAtivoId(this.ativoId).subscribe(result => {
        this.nomeAtivo = result.nome;
        this.form = new FormGroup({
          ativoId: new FormControl(result.ativoId),
          nome: new FormControl(result.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
          sigla: new FormControl(result.sigla, [Validators.required, Validators.minLength(4)]),
          setor: new FormControl(result.setor, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
          usuarioId: new FormControl(result.usuarioId)
        });
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

      this.ativosService.PutAtivo(this.ativoId, ativo).subscribe(result => {
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
