import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadosRegistro } from 'src/app/models/DadosRegistro';
import { UsuariosService} from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['../../../default.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  form: any;
  foto: File = null;
  erros: string[];

  constructor(
    private usuariosService: UsuariosService,
    private router : Router
    ) { }

    ngOnInit(): void {
      this.erros = [];

      this.form = new FormGroup({
        nomeUsuario: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        cpf: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
        foto: new FormControl(null),
        email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]),
        senha: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
      });
    }

    get property () {
      return this.form.controls;
    }

    selecionarFoto(fileInput: any): void {
      this.foto = fileInput.target.files[0] as File;
      const reader = new FileReader();
      reader.onload = function(e : any){
        document.getElementById('foto').removeAttribute('hidden');
        document.getElementById('foto').setAttribute('src', e.target.result);
      }

      reader.readAsDataURL(this.foto);
    }

    sendForm(): void {
      this.erros = [];
      const usuario = this.form.value;
      const formData: FormData = new FormData();

      if (this.foto != null) {
        formData.append('file', this.foto, this.foto.name);
      }

      this.usuariosService.SalvarFoto(FormData).subscribe(result => {
        const dadosRegistro: DadosRegistro = new DadosRegistro();
        dadosRegistro.nomeUsuario = usuario.nomeUsuario;
        dadosRegistro.cpf = usuario.cpf;
        //dadosRegistro.foto = result.foto;
        dadosRegistro.email = usuario.email;
        dadosRegistro.senha = usuario.senha;

        this.usuariosService.RegistrarUsuario(dadosRegistro).subscribe(dados => {
          const emailUsuarioLogado = dados.emailUserLogin;
          const usuarioId = dados.usuarioId;
          const tokenUsuarioLogado = dados.tokenUsuarioLogado;
          localStorage.setItem('EmaliUsuarioLogado', emailUsuarioLogado);
          localStorage.setItem('UsuarioId', usuarioId);
          localStorage.setItem('TokenUsuarioLogado', tokenUsuarioLogado);
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
        });
      });
    }
  }
