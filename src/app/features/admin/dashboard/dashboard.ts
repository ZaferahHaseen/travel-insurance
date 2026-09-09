import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  LucideAngularModule,
  Users,
  UserRoundCheck,
  UsersRound,
  Globe2
} from 'lucide-angular';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,

  imports: [
    LucideAngularModule
  ],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  readonly UsersIcon = Users;
  readonly GroupIcon = UsersRound;
  readonly UserCheckIcon = UserRoundCheck;
  readonly GlobeIcon = Globe2;


  constructor(
    private router: Router
  ) {}


  goToUsers(): void {
    this.router.navigate(['/admin/users']);
  }


  goToUserGroups(): void {
    this.router.navigate(['/admin/user-groups']);
  }


  goToWarGeography(): void {
    this.router.navigate(['/admin/war-geography']);
  }


  createUser(): void {
    this.router.navigate(['/admin/users']);
  }

}