import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../default.css']
})
export class HeaderComponent implements OnInit {

  emailUsuarioLogado = localStorage.getItem("EmaliUsuarioLogado");

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['usuarios/loginusuario']);
  }

}
