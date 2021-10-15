import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../default.css']
})
export class DashboardComponent implements OnInit {

  isAdmin: boolean;

  constructor(
    private authGuard: AuthGuardService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authGuard.checkAdmin();
  }

}
