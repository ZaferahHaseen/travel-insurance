import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  group: string;
  status: 'ACTIVE' | 'INACTIVE';
  authorities: string[];
}

interface Authority {
  code: string;
  name: string;
  type: 'GRANT' | 'REVOKE';
  selected: boolean;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.css'
})

export class Users {

  showCreateForm = false;
  showDetails = false;

  searchText = '';
  selectedUser: User | null = null;

  username = '';
  email = '';
  fullName = '';
  password = '';
  status: 'ACTIVE' | 'INACTIVE' = 'ACTIVE';
  selectedGroup = '';

  groups = [
    {
      code: 'UNDERWRITING_USER',
      name: 'Underwriting user'
    },
    {
      code: 'APPROVER_USER',
      name: 'Approver user'
    }
  ];

  users: User[] = [
    {
      id: 1,
      username: 'uw.ravi',
      email: 'ravi@company.com',
      fullName: 'Ravi Kumar',
      group: 'UNDERWRITING_USER',
      status: 'ACTIVE',
      authorities: []
    },
    {
      id: 2,
      username: 'ap.meera',
      email: 'meera@company.com',
      fullName: 'Meera Sharma',
      group: 'APPROVER_USER',
      status: 'ACTIVE',
      authorities: []
    }
  ];

  authorities: Authority[] = [
    {
      code: 'AUDIT_VIEW',
      name: 'Audit View',
      type: 'GRANT',
      selected: false
    },
    {
      code: 'QUOTATION_CONVERT_POLICY',
      name: 'Quotation Convert Policy',
      type: 'REVOKE',
      selected: false
    },
    {
      code: 'QUOTATION_CREATE',
      name: 'Quotation Create',
      type: 'GRANT',
      selected: false
    },
    {
      code: 'PAYMENT_COLLECT',
      name: 'Payment Collect',
      type: 'GRANT',
      selected: false
    },
    {
      code: 'DOCUMENT_UPLOAD',
      name: 'Document Upload',
      type: 'GRANT',
      selected: false
    },
    {
      code: 'POLICY_VIEW_OWN',
      name: 'Policy View Own',
      type: 'GRANT',
      selected: false
    },
    {
      code: 'POLICY_VIEW_REFERRED',
      name: 'Policy View Referred',
      type: 'GRANT',
      selected: false
    },
    {
      code: 'POLICY_APPROVE_WAR',
      name: 'Policy Approve War',
      type: 'GRANT',
      selected: false
    },
    {
      code: 'POLICY_REJECT_WAR',
      name: 'Policy Reject War',
      type: 'GRANT',
      selected: false
    }
  ];

  constructor(private router: Router) {}

  get filteredUsers(): User[] {
    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      return this.users;
    }

    return this.users.filter(user =>
      user.username.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.fullName.toLowerCase().includes(search) ||
      user.group.toLowerCase().includes(search)
    );
  }

  get activeUsers(): number {
    return this.users.filter(user => user.status === 'ACTIVE').length;
  }

  get selectedGrants(): string[] {
    return this.authorities
      .filter(a => a.selected && a.type === 'GRANT')
      .map(a => a.code);
  }

  get selectedRevokes(): string[] {
    return this.authorities
      .filter(a => a.selected && a.type === 'REVOKE')
      .map(a => a.code);
  }

  get passwordValid(): boolean {
    const value = this.password;

    return value.length >= 12 &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[^A-Za-z0-9]/.test(value);
  }

  openCreateForm(): void {
    this.resetForm();
    this.showCreateForm = true;
    this.showDetails = false;
  }

  closeCreateForm(): void {
    this.showCreateForm = false;
    this.resetForm();
  }

  toggleAuthority(authority: Authority): void {
    authority.selected = !authority.selected;
  }

  createUser(): void {

    if (
      !this.username.trim() ||
      !this.email.trim() ||
      !this.fullName.trim() ||
      !this.passwordValid ||
      !this.selectedGroup
    ) {
      return;
    }

    const usernameExists = this.users.some(
      user => user.username.toLowerCase() === this.username.trim().toLowerCase()
    );

    const emailExists = this.users.some(
      user => user.email.toLowerCase() === this.email.trim().toLowerCase()
    );

    if (usernameExists) {
      alert('Username already exists.');
      return;
    }

    if (emailExists) {
      alert('Email already exists.');
      return;
    }

    const newUser: User = {
      id: Date.now(),
      username: this.username.trim(),
      email: this.email.trim(),
      fullName: this.fullName.trim(),
      group: this.selectedGroup,
      status: this.status,
      authorities: [
        ...this.selectedGrants,
        ...this.selectedRevokes
      ]
    };

    this.users = [...this.users, newUser];

    this.showCreateForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.username = '';
    this.email = '';
    this.fullName = '';
    this.password = '';
    this.status = 'ACTIVE';
    this.selectedGroup = '';

    this.authorities.forEach(authority => {
      authority.selected = false;
    });
  }

  viewUser(user: User): void {
    this.selectedUser = user;
    this.showDetails = true;
    this.showCreateForm = false;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedUser = null;
  }

  toggleUserStatus(user: User): void {
    user.status =
      user.status === 'ACTIVE'
        ? 'INACTIVE'
        : 'ACTIVE';
  }

  mapGroup(user: User): void {
    const group = prompt(
      `Enter group code:\n\nUNDERWRITING_USER\nAPPROVER_USER`
    );

    if (!group) {
      return;
    }

    const normalizedGroup = group.trim().toUpperCase();

    const validGroup = this.groups.some(
      item => item.code === normalizedGroup
    );

    if (!validGroup) {
      alert('Invalid group code.');
      return;
    }

    user.group = normalizedGroup;

    alert(
      `User ${user.username} mapped to ${normalizedGroup}.\n\n` +
      `The user must re-login for the new group authorities to take effect.`
    );
  }

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}