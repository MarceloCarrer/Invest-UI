import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Mes } from 'src/app/models/Mes';
import { InvestimentosService } from 'src/app/services/investimentos.service';
import { MesService } from 'src/app/services/mes.service';

@Component({
  selector: 'app-novo-investimento',
  templateUrl: './novo-investimento.component.html',
  styleUrls: ['../../default.css']
})
export class NovoInvestimentoComponent implements OnInit {

  form: any;
  meses: Mes[];
  erros: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');

  constructor(
    private investimentosService : InvestimentosService,
    private mesService : MesService,
    private router : Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.erros = [];

    this.mesService.GetAllMeses().subscribe(result => {
      this.meses = result;
    })

    this.form = new FormGroup({
      dia: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(31)]),
      mesId: new FormControl(null, [Validators.required]),
      ano: new FormControl(new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2199)]),
      valor: new FormControl(null, [Validators.required, Validators.min(0.01)]),
      usuarioId: new FormControl(this.usuarioId)
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
    this.investimentosService.PostInvestimento(investimento).subscribe(result => {
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
