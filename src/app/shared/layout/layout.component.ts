import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router: Router) {}

  // =====================================================
  // NAVIGATION
  // =====================================================

  goBack(): void {
    window.history.back();
  }

  goHome(): void {

    const url = this.router.url;

    if (url.startsWith('/admin')) {
      this.router.navigate(['/admin/dashboard']);
      return;
    }

    if (url.startsWith('/underwriter')) {
      this.router.navigate(['/underwriter/dashboard']);
      return;
    }

    if (url.startsWith('/approver')) {
      this.router.navigate(['/approver/dashboard']);
      return;
    }

    if (url.startsWith('/client')) {
      this.router.navigate(['/client/dashboard']);
      return;
    }

    this.router.navigate(['/login']);
  }

  logout(): void {

    sessionStorage.clear();

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    this.router.navigate(['/login']);
  }


  // =====================================================
  // ROLE DETECTION
  // =====================================================

  isAdmin(): boolean {
    return this.router.url.startsWith('/admin');
  }

  isUnderwriter(): boolean {
    return this.router.url.startsWith('/underwriter');
  }

  isApprover(): boolean {
    return this.router.url.startsWith('/approver');
  }

  isClient(): boolean {
    return this.router.url.startsWith('/client');
  }


  // =====================================================
  // ROLE DISPLAY
  // =====================================================

  getRoleName(): string {

    if (this.isAdmin()) {
      return 'Administrator';
    }

    if (this.isUnderwriter()) {
      return 'Underwriter';
    }

    if (this.isApprover()) {
      return 'Approver';
    }

    if (this.isClient()) {
      return 'Client';
    }

    return 'User';
  }

  getRoleDescription(): string {

    if (this.isAdmin()) {
      return 'System Administration';
    }

    if (this.isUnderwriter()) {
      return 'Risk Management';
    }

    if (this.isApprover()) {
      return 'Policy Approval';
    }

    if (this.isClient()) {
      return 'Travel Insurance';
    }

    return 'TravelSure Portal';
  }
}