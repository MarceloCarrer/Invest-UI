import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['../../../default.css']
})
export class LoginUsuarioComponent implements OnInit {

  form: any;
  erros: string[];

  constructor(
    private usuariosService: UsuariosService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.erros = [];

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]),
      senha: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
    });
  }

  get property () {
    return this.form.controls;
  }

  sendForm(): void {
    this.erros = [];
    const dadosLogin = this.form.value;

    this.usuariosService.LogarUsuario(dadosLogin).subscribe(result => {
      const emailUsuarioLogado = result.emailUsuarioLogado;
      const usuarioId = result.usuarioId;
      const tokenUsuarioLogado = result.tokenUsuarioLogado;
      localStorage.setItem('EmaliUsuarioLogado', emailUsuarioLogado);
      localStorage.setItem('UsuarioId', usuarioId);
      localStorage.setItem('TokenUsuarioLogado', tokenUsuarioLogado);
      console.log(tokenUsuarioLogado);
      this.router.navigate(['dashboard/index']);
    },
    (err) => {
      if (err.status === 400) {
        for (const campo in err.error.errors) {
          if (err.error.errors.hasOwnProperty(campo)) {
            this.erros.push(err.error.errors[campo]);
          }
        }
      }
      else
      {
        this.erros.push(err.error);
      }
    });
  }
}
