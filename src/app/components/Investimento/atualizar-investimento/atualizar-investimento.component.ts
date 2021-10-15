import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mes } from 'src/app/models/Mes';
import { Investimento } from 'src/app/models/Investimento';
import { InvestimentosService } from 'src/app/services/investimentos.service';
import { MesService } from 'src/app/services/mes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-atualizar-investimento',
  templateUrl: './atualizar-investimento.component.html',
  styleUrls: ['../../default.css']
})
export class AtualizarInvestimentoComponent implements OnInit {

  investimento: Observable<Investimento>;
  investimentoId: number;
  investimentoValor: string;
  meses: Mes[];
  form: any;
  erros: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(
    private investimentosService: InvestimentosService,
    private mesService : MesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.erros = [];

    this.investimentoId = this.route.snapshot.params.id;

    this.mesService.GetAllMeses().subscribe(result => {
      this.meses = result;
    })

    this.investimentosService.GetInvestimentoId(this.investimentoId).subscribe(result => {
      this.investimentoValor = result.dia.toString() + '/' + result.mesId.toString() + '/' + result.ano.toString();
      this.form = new FormGroup({
        investimentoId: new FormControl(result.investimentoId),
        valor: new FormControl(result.valor, [Validators.required, Validators.min(0.01)]),
        dia: new FormControl(result.dia, [Validators.required, Validators.min(1), Validators.max(31)]),
        mesId: new FormControl(result.mesId, [Validators.required]),
        ano: new FormControl(result.ano, [Validators.required, Validators.min(2000), Validators.max(2199)]),
        usuarioId: new FormControl(this.usuarioId)
      })
    })
  }

  get property () {
    return this.form.controls;
  }

  listReturn(): void {
    this.router.navigate(['investimentos/listageminvestimentos']);
  }

  sendForm(): void {
    const investimento = this.form.value;
    this.erros = [];
    this.investimentosService.PutInvestimento(this.investimentoId, investimento).subscribe(result => {
      this.router.navigate(['investimentos/listageminvestimentos']);
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
