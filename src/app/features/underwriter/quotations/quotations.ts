import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Quotation {
  quotationNumber: string;
  policyholder: string;
  email: string;
  insuranceType: string;
  destination: string;
  travelDates: string;
  premium: number;
  status: 'PENDING' | 'COMPLETED';
}

@Component({
  selector: 'app-quotations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quotations.html',
  styleUrl: './quotations.css'
})
export class Quotations {

  searchText = '';
  selectedStatus = 'ALL';

  quotations: Quotation[] = [
    {
      quotationNumber: 'QT-2026-00124',
      policyholder: 'Arun Kumar',
      email: 'arun.kumar@email.com',
      insuranceType: 'Travel Insurance',
      destination: 'United Kingdom',
      travelDates: '15 Sep 2026 - 28 Sep 2026',
      premium: 4850,
      status: 'PENDING'
    },
    {
      quotationNumber: 'QT-2026-00123',
      policyholder: 'Meera Sharma',
      email: 'meera.sharma@email.com',
      insuranceType: 'Travel Insurance',
      destination: 'Singapore',
      travelDates: '10 Sep 2026 - 18 Sep 2026',
      premium: 3250,
      status: 'COMPLETED'
    },
    {
      quotationNumber: 'QT-2026-00122',
      policyholder: 'Rahul Menon',
      email: 'rahul.menon@email.com',
      insuranceType: 'Travel Insurance',
      destination: 'Australia',
      travelDates: '02 Oct 2026 - 20 Oct 2026',
      premium: 6120,
      status: 'PENDING'
    },
    {
      quotationNumber: 'QT-2026-00121',
      policyholder: 'Priya Nair',
      email: 'priya.nair@email.com',
      insuranceType: 'Travel Insurance',
      destination: 'France',
      travelDates: '21 Sep 2026 - 30 Sep 2026',
      premium: 3980,
      status: 'COMPLETED'
    },
    {
      quotationNumber: 'QT-2026-00120',
      policyholder: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      insuranceType: 'Travel Insurance',
      destination: 'United States',
      travelDates: '05 Nov 2026 - 22 Nov 2026',
      premium: 7350,
      status: 'PENDING'
    }
  ];

  constructor(private router: Router) {}

  get filteredQuotations(): Quotation[] {
    const search = this.searchText.trim().toLowerCase();

    return this.quotations.filter(quotation => {

      const matchesSearch =
        !search ||
        quotation.quotationNumber.toLowerCase().includes(search) ||
        quotation.policyholder.toLowerCase().includes(search) ||
        quotation.email.toLowerCase().includes(search) ||
        quotation.destination.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        quotation.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get totalQuotations(): number {
    return this.quotations.length;
  }

  get pendingQuotations(): number {
    return this.quotations.filter(
      quotation => quotation.status === 'PENDING'
    ).length;
  }

  get completedQuotations(): number {
    return this.quotations.filter(
      quotation => quotation.status === 'COMPLETED'
    ).length;
  }

  createQuotation(): void {
    this.router.navigate(['/underwriter/quotations/new']);
  }

  viewQuotation(quotation: Quotation): void {
    console.log('Viewing quotation:', quotation);
  }

  setStatus(status: string): void {
    this.selectedStatus = status;
  }

  goBack(): void {
    window.history.back();
  }
}