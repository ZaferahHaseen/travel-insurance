import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  Plus,
  Search,
  ShieldCheck,
  Users,
  Pencil,
  Trash2,
  Eye,
  X,
  Check
} from 'lucide-angular';

interface UserGroup {
  id: number;
  name: string;
  description: string;
  authorities: string[];
  userCount: number;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-user-groups',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './user-groups.html',
  styleUrl: './user-groups.css'
})
export class UserGroups {

  readonly Plus = Plus;
  readonly Search = Search;
  readonly ShieldCheck = ShieldCheck;
  readonly Users = Users;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly Eye = Eye;
  readonly X = X;
  readonly Check = Check;

  searchTerm = '';

  showCreateForm = false;
  showViewModal = false;

  selectedGroup: UserGroup | null = null;

  newGroup = {
    name: '',
    description: '',
    authorities: [] as string[]
  };

  authorities = [
    'View Dashboard',
    'Create Quotation',
    'View Quotations',
    'Manage Policies',
    'Approve Quotation',
    'Manage Users',
    'Manage User Groups',
    'Manage War Geography'
  ];

  groups: UserGroup[] = [
    {
      id: 1,
      name: 'Admin',
      description: 'Full administration and system management access.',
      authorities: [
        'View Dashboard',
        'Manage Users',
        'Manage User Groups',
        'Manage War Geography'
      ],
      userCount: 2,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Underwriter',
      description: 'Quotation and policy underwriting access.',
      authorities: [
        'View Dashboard',
        'Create Quotation',
        'View Quotations',
        'Manage Policies'
      ],
      userCount: 8,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Approver',
      description: 'Quotation review and approval access.',
      authorities: [
        'View Dashboard',
        'View Quotations',
        'Approve Quotation'
      ],
      userCount: 4,
      status: 'Active'
    }
  ];

  constructor(private router: Router) {}

  get filteredGroups(): UserGroup[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.groups;
    }

    return this.groups.filter(group =>
      group.name.toLowerCase().includes(term) ||
      group.description.toLowerCase().includes(term)
    );
  }

  openCreateForm(): void {
    this.newGroup = {
      name: '',
      description: '',
      authorities: []
    };

    this.showCreateForm = true;
  }

  closeCreateForm(): void {
    this.showCreateForm = false;
  }

  toggleAuthority(authority: string): void {
    const index = this.newGroup.authorities.indexOf(authority);

    if (index >= 0) {
      this.newGroup.authorities.splice(index, 1);
    } else {
      this.newGroup.authorities.push(authority);
    }
  }

  isAuthoritySelected(authority: string): boolean {
    return this.newGroup.authorities.includes(authority);
  }

  createGroup(): void {
    if (!this.newGroup.name.trim()) {
      return;
    }

    const group: UserGroup = {
      id: this.groups.length + 1,
      name: this.newGroup.name.trim(),
      description: this.newGroup.description.trim() ||
        'No description provided.',
      authorities: [...this.newGroup.authorities],
      userCount: 0,
      status: 'Active'
    };

    this.groups.push(group);

    this.showCreateForm = false;

    this.newGroup = {
      name: '',
      description: '',
      authorities: []
    };
  }

  viewGroup(group: UserGroup): void {
    this.selectedGroup = group;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedGroup = null;
  }

  editGroup(group: UserGroup): void {
    this.newGroup = {
      name: group.name,
      description: group.description,
      authorities: [...group.authorities]
    };

    this.selectedGroup = group;
    this.showCreateForm = true;
  }

  deleteGroup(group: UserGroup): void {
    const confirmed = window.confirm(
      `Delete the "${group.name}" group?`
    );

    if (!confirmed) {
      return;
    }

    this.groups = this.groups.filter(item => item.id !== group.id);
  }

  goHome(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  goBack(): void {
    window.history.back();
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}