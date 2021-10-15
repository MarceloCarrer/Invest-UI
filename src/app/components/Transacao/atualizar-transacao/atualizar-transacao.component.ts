import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ativo } from 'src/app/models/Ativo';
import { Mes } from 'src/app/models/Mes';
import { Tipo } from 'src/app/models/Tipo';
import { Transacao } from 'src/app/models/Transacao';
import { AtivosService } from 'src/app/services/ativos.service';
import { MesService } from 'src/app/services/mes.service';
import { TiposService } from 'src/app/services/tipos.service';
import { TransacoesService } from 'src/app/services/transacoes.service';

@Component({
  selector: 'app-atualizar-transacao',
  templateUrl: './atualizar-transacao.component.html',
  styleUrls: ['../../default.css']
})
export class AtualizarTransacaoComponent implements OnInit {

  transacao: Observable<Transacao>;
  transacaoId: number;
  ativoTransacao: string;
  tipos: Tipo[];
  ativos: Ativo[];
  meses: Mes[];
  form: any;
  erros: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(
    private transacoesService: TransacoesService,
    private tiposService : TiposService,
    private ativosService : AtivosService,
    private mesService : MesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.erros = [];

    this.transacaoId = this.route.snapshot.params.id;

    this.ativosService.GetAtivosUserId(this.usuarioId).subscribe(result => {
      this.ativos = result;
    })

    this.tiposService.GetAllTipos().subscribe(result => {
      this.tipos = result;
    })

    this.mesService.GetAllMeses().subscribe(result => {
      this.meses = result;
    })

    this.transacoesService.GetTransacaoId(this.transacaoId).subscribe(result => {
      this.ativoTransacao = result.diaCompra.toString() + '/' + result.mesIdCompra.toString() + '/' + result.anoCompra.toString();
      this.form = new FormGroup({
        transacaoId: new FormControl(result.transacaoId),
        ativoId: new FormControl(result.ativoId, [Validators.required]),
        tipoId: new FormControl(result.tipoId, [Validators.required]),
        qtdCompra: new FormControl(result.qtdCompra, [Validators.required, Validators.min(1)]),
        valorCompra: new FormControl(result.valorCompra, [Validators.required, Validators.min(0.01)]),
        diaCompra: new FormControl(result.diaCompra, [Validators.required, Validators.min(1), Validators.max(31)]),
        mesIdCompra: new FormControl(result.mesIdCompra, [Validators.required]),
        anoCompra: new FormControl(result.anoCompra, [Validators.required, Validators.min(2000), Validators.max(2199)]),
        vendido: new FormControl(result.vendido),
        qtdVenda: new FormControl(result.qtdVenda),
        valorVenda: new FormControl(result.valorVenda, [Validators.min(0.00)]),
        diaVenda: new FormControl(result.diaVenda, [Validators.min(0), Validators.max(31)]),
        mesIdVenda: new FormControl(result.mesIdVenda),
        anoVenda: new FormControl(result.anoVenda, [Validators.min(2000), Validators.max(2199)]),
        usuarioId: new FormControl(this.usuarioId)
      })
    })
  }

  get property () {
    return this.form.controls;
  }

  listReturn(): void {
    this.router.navigate(['transacoes/listagemtransacoes']);
  }

  sendForm(): void {
    this.erros = [];
    const transacao = this.form.value;

    this.transacoesService.PutTransacao(this.transacaoId, transacao).subscribe(result => {
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
