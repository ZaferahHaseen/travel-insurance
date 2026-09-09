import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approver-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(private router: Router) {}

  goToInbox(): void {
    this.router.navigate(['/approvals']);
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}