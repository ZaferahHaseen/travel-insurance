import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Quotation {
  number: string;
  client: string;
  date: string;
  status: 'PENDING' | 'IN PROGRESS' | 'COMPLETED';
}

interface ActivityData {
  day: string;
  quotations: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  // =====================================================
  // QUOTATION DATA
  // =====================================================

  quotations: Quotation[] = [
    {
      number: 'QT-2026-001',
      client: 'Global Travels Pvt Ltd',
      date: '08 Sep 2026',
      status: 'PENDING'
    },
    {
      number: 'QT-2026-002',
      client: 'Skyline Holidays',
      date: '07 Sep 2026',
      status: 'IN PROGRESS'
    },
    {
      number: 'QT-2026-003',
      client: 'WorldWide Tours',
      date: '06 Sep 2026',
      status: 'COMPLETED'
    },
    {
      number: 'QT-2026-004',
      client: 'Travel Point',
      date: '05 Sep 2026',
      status: 'COMPLETED'
    },
    {
      number: 'QT-2026-005',
      client: 'ABC International Travels',
      date: '04 Sep 2026',
      status: 'PENDING'
    }
  ];


  // =====================================================
  // POLICY DATA
  // =====================================================

  totalPolicies = 8;


  // =====================================================
  // QUOTATION ACTIVITY
  // =====================================================

  quotationActivity: ActivityData[] = [
    {
      day: 'Mon',
      quotations: 4
    },
    {
      day: 'Tue',
      quotations: 7
    },
    {
      day: 'Wed',
      quotations: 5
    },
    {
      day: 'Thu',
      quotations: 9
    },
    {
      day: 'Fri',
      quotations: 6
    },
    {
      day: 'Sat',
      quotations: 8
    },
    {
      day: 'Sun',
      quotations: 5
    }
  ];


  // =====================================================
  // DATE FILTER
  // =====================================================

  selectedPeriod = 'This Week';

  periods = [
    'Today',
    'This Week',
    'This Month'
  ];


  constructor(
    private router: Router
  ) {}


  // =====================================================
  // COUNTS
  // =====================================================

  get totalQuotations(): number {

    return this.quotations.length;

  }


  get pendingQuotations(): number {

    return this.quotations.filter(
      quotation =>
        quotation.status === 'PENDING'
    ).length;

  }


  get inProgressQuotations(): number {

    return this.quotations.filter(
      quotation =>
        quotation.status === 'IN PROGRESS'
    ).length;

  }


  get completedQuotations(): number {

    return this.quotations.filter(
      quotation =>
        quotation.status === 'COMPLETED'
    ).length;

  }


  // =====================================================
  // ACTIVITY GRAPH
  // =====================================================

  getActivityHeight(
    value: number
  ): number {

    const maxValue = Math.max(
      ...this.quotationActivity.map(
        activity =>
          activity.quotations
      ),
      1
    );

    return Math.round(
      (value / maxValue) * 100
    );

  }


  // =====================================================
  // PIE CHART
  // =====================================================

  get workloadGradient(): string {

    const total =
      this.totalQuotations;

    if (total === 0) {

      return '#e9eef3 0deg 360deg';

    }

    const pendingDegrees =
      (this.pendingQuotations / total) * 360;

    const progressDegrees =
      (this.inProgressQuotations / total) * 360;

    const completedStart =
      pendingDegrees +
      progressDegrees;

    return `
      #d89b32 0deg ${pendingDegrees}deg,
      #3977bd ${pendingDegrees}deg ${completedStart}deg,
      #277956 ${completedStart}deg 360deg
    `;

  }


  // =====================================================
  // NAVIGATION
  // =====================================================

  createQuotation(): void {

    this.router.navigate([
      '/underwriter/quotations/new'
    ]);

  }


  viewQuotations(): void {

    this.router.navigate([
      '/underwriter/quotations'
    ]);

  }


  viewPendingQuotations(): void {

    this.router.navigate(
      ['/underwriter/quotations'],
      {
        queryParams: {
          status: 'PENDING'
        }
      }
    );

  }


  viewPolicies(): void {

    this.router.navigate([
      '/underwriter/policies'
    ]);

  }


  changePeriod(
    period: string
  ): void {

    this.selectedPeriod =
      period;

  }

}