import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AtualizarUsuario } from 'src/app/models/AtualizarUsuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.component.html',
  styleUrls: ['../../default.css']
})
export class AtualizarUsuarioComponent implements OnInit {

  form: any;
  erros: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  emailUsuario: string;
  nomeUsuario: string;

  constructor(
    private usuariosService: UsuariosService,
    private router : Router,
    private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
      this.erros = [];

      this.usuariosService.GetUserForId(this.usuarioId).subscribe(result => {
        this.emailUsuario = result.email;
        this.nomeUsuario = result.nomeUsuario;

        this.form = new FormGroup({
          id: new FormControl(result.id),
          nomeUsuario: new FormControl(result.nomeUsuario, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
          cpf: new FormControl(result.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
          email: new FormControl(result.email, [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]),
        });
      });
    }

    get property () {
      return this.form.controls;
    }

    listReturn(): void {
      this.router.navigate(['dashboard/index']);
    }

    sendForm(): void {
      this.erros = [];

      const dados = this.form.value;
      const atualizarUsuario: AtualizarUsuario = new AtualizarUsuario();
      atualizarUsuario.id = dados.id;
      atualizarUsuario.nomeUsuario = dados.nomeUsuario;
      atualizarUsuario.cpf = dados.cpf;
      atualizarUsuario.email = dados.email;

      this.usuariosService.PutUser(atualizarUsuario).subscribe(
        (result) => {
          this.router.navigate(['dashboard/index']);
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
