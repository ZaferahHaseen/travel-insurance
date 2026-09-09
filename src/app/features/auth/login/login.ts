import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import {
  LucideAngularModule,
  Plane,
  ShieldCheck,
  User,
  LockKeyhole,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-angular';

type UserRole = 'ADMIN' | 'UNDERWRITER' | 'APPROVER';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideAngularModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  readonly Plane = Plane;
  readonly ShieldCheck = ShieldCheck;
  readonly User = User;
  readonly LockKeyhole = LockKeyhole;
  readonly ArrowRight = ArrowRight;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  loginForm: FormGroup;

  selectedRole: UserRole = 'UNDERWRITER';

  showPassword = false;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  selectRole(role: UserRole): void {
    this.selectedRole = role;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const username = this.loginForm.value.username;

    sessionStorage.setItem('userRole', this.selectedRole);
    sessionStorage.setItem('username', username);

    setTimeout(() => {

      this.isLoading = false;

      if (this.selectedRole === 'ADMIN') {
        this.router.navigate(['/admin/dashboard']);
        return;
      }

      if (this.selectedRole === 'UNDERWRITER') {
        this.router.navigate(['/underwriter/dashboard']);
        return;
      }

      if (this.selectedRole === 'APPROVER') {
        this.router.navigate(['/approver/dashboard']);
        return;
      }

    }, 300);
  }
}