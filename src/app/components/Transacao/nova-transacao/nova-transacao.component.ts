import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ativo } from 'src/app/models/Ativo';
import { Mes } from 'src/app/models/Mes';
import { Tipo } from 'src/app/models/Tipo';
import { AtivosService } from 'src/app/services/ativos.service';
import { MesService } from 'src/app/services/mes.service';
import { TiposService } from 'src/app/services/tipos.service';
import { TransacoesService } from 'src/app/services/transacoes.service';

@Component({
  selector: 'app-nova-transacao',
  templateUrl: './nova-transacao.component.html',
  styleUrls: ['../../default.css']
})
export class NovaTransacaoComponent implements OnInit {

  form: any;
  tipos: Tipo[];
  ativos: Ativo[];
  meses: Mes[];
  erros: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(
    private transacoesService : TransacoesService,
    private tiposService : TiposService,
    private ativosService : AtivosService,
    private mesService : MesService,
    private router : Router,
    private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
      this.erros = [];

      this.ativosService.GetAtivosUserId(this.usuarioId).subscribe(result => {
        this.ativos = result;
      })

      this.tiposService.GetAllTipos().subscribe(result => {
        this.tipos = result;
      })

      this.mesService.GetAllMeses().subscribe(result => {
        this.meses = result;
      })

      this.form = new FormGroup({
        ativoId: new FormControl(null, [Validators.required]),
        tipoId: new FormControl(null, [Validators.required]),
        qtdCompra: new FormControl(null, [Validators.required, Validators.min(1)]),
        valorCompra: new FormControl(null, [Validators.required, Validators.min(0.01)]),
        diaCompra: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(31)]),
        mesIdCompra: new FormControl(null, [Validators.required]),
        anoCompra: new FormControl(new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2199)]),
        vendido: new FormControl(false),
        qtdVenda: new FormControl(null),
        valorVenda: new FormControl(null, [Validators.min(0.00)]),
        diaVenda: new FormControl(null, [Validators.min(0), Validators.max(31)]),
        mesIdVenda: new FormControl(null),
        anoVenda: new FormControl(null, [Validators.min(2000), Validators.max(2199)]),
        usuarioId: new FormControl(this.usuarioId)
      });
    }

    get property () {
      return this.form.controls;
    }

    listReturn(): void {
      this.router.navigate(['transacoes/listagemtransacoes']);
    }

    sendForm(): void {
      const transacao = this.form.value;
      this.erros = [];
      this.transacoesService.PostTransacao(transacao).subscribe(result => {
        this.router.navigate(['transacoes/listagemtransacoes']);
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
