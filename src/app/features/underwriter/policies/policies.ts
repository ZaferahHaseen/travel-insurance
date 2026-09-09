import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Policy {
  id: number;
  policyNumber: string;
  quotationNumber: string;
  travellerName: string;
  destinationCountry: string;
  destinationCity: string;
  travelStartDate: string;
  travelEndDate: string;
  coverType: string;
  sumInsured: number;
  premium: number;
  currency: string;
  status: 'ISSUED' | 'PENDING_APPROVAL' | 'REJECTED';
  requiresApproval: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policies.html',
  styleUrl: './policies.css'
})

export class Policies {

  searchText = '';

  selectedFilter:
    | 'ALL'
    | 'ISSUED'
    | 'PENDING_APPROVAL'
    | 'REJECTED' = 'ALL';

  selectedPolicy: Policy | null = null;

  /*
   * Temporary frontend data.
   *
   * These values will later come from:
   * GET /api/v1/policies
   *
   * The backend will return only policies created
   * by the logged-in underwriter.
   */
  policies: Policy[] = [
    {
      id: 1,
      policyNumber: 'PL-2026-000001',
      quotationNumber: 'QT-2026-000014',
      travellerName: 'Ravi Kumar',
      destinationCountry: 'France',
      destinationCity: 'Paris',
      travelStartDate: '2026-10-05',
      travelEndDate: '2026-10-15',
      coverType: 'Comprehensive',
      sumInsured: 100000,
      premium: 2450,
      currency: 'INR',
      status: 'ISSUED',
      requiresApproval: false,
      createdAt: '2026-09-05'
    },
    {
      id: 2,
      policyNumber: 'PL-2026-000002',
      quotationNumber: 'QT-2026-000018',
      travellerName: 'Meera Sharma',
      destinationCountry: 'Japan',
      destinationCity: 'Tokyo',
      travelStartDate: '2026-11-02',
      travelEndDate: '2026-11-12',
      coverType: 'Comprehensive',
      sumInsured: 150000,
      premium: 3200,
      currency: 'INR',
      status: 'ISSUED',
      requiresApproval: false,
      createdAt: '2026-09-06'
    },
    {
      id: 3,
      policyNumber: 'PL-2026-000003',
      quotationNumber: 'QT-2026-000021',
      travellerName: 'Arjun Menon',
      destinationCountry: 'Country A',
      destinationCity: 'Capital City',
      travelStartDate: '2026-10-20',
      travelEndDate: '2026-10-30',
      coverType: 'Comprehensive',
      sumInsured: 100000,
      premium: 2850,
      currency: 'INR',
      status: 'PENDING_APPROVAL',
      requiresApproval: true,
      createdAt: '2026-09-07'
    },
    {
      id: 4,
      policyNumber: 'PL-2026-000004',
      quotationNumber: 'QT-2026-000024',
      travellerName: 'Nisha Thomas',
      destinationCountry: 'Country B',
      destinationCity: 'City B',
      travelStartDate: '2026-12-01',
      travelEndDate: '2026-12-10',
      coverType: 'Basic',
      sumInsured: 50000,
      premium: 1650,
      currency: 'INR',
      status: 'REJECTED',
      requiresApproval: true,
      createdAt: '2026-09-07'
    }
  ];

  constructor(private router: Router) {}

  get issuedPolicies(): number {
    return this.policies.filter(
      policy => policy.status === 'ISSUED'
    ).length;
  }

  get pendingPolicies(): number {
    return this.policies.filter(
      policy => policy.status === 'PENDING_APPROVAL'
    ).length;
  }

  get rejectedPolicies(): number {
    return this.policies.filter(
      policy => policy.status === 'REJECTED'
    ).length;
  }

  get filteredPolicies(): Policy[] {
    const search = this.searchText.trim().toLowerCase();

    return this.policies.filter(policy => {

      const matchesFilter =
        this.selectedFilter === 'ALL' ||
        policy.status === this.selectedFilter;

      if (!matchesFilter) {
        return false;
      }

      if (!search) {
        return true;
      }

      return (
        policy.policyNumber.toLowerCase().includes(search) ||
        policy.quotationNumber.toLowerCase().includes(search) ||
        policy.travellerName.toLowerCase().includes(search) ||
        policy.destinationCountry.toLowerCase().includes(search) ||
        policy.destinationCity.toLowerCase().includes(search)
      );
    });
  }

  setFilter(
    filter: 'ALL' | 'ISSUED' | 'PENDING_APPROVAL' | 'REJECTED'
  ): void {
    this.selectedFilter = filter;
  }

  viewPolicy(policy: Policy): void {
    this.selectedPolicy = policy;
  }

  closePolicy(): void {
    this.selectedPolicy = null;
  }

  createQuotation(): void {
    this.router.navigate(['/quotations/new']);
  }

  formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: string): string {
    const value = new Date(date);

    return value.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  getStatusLabel(status: Policy['status']): string {
    switch (status) {
      case 'PENDING_APPROVAL':
        return 'Pending Approval';

      case 'ISSUED':
        return 'Issued';

      case 'REJECTED':
        return 'Rejected';

      default:
        return status;
    }
  }
}