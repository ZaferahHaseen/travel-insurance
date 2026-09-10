import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Coverage {
  name: string;
  sumInsured: number;
  rate: number;
  premium: number;
  description: string;
}

interface Quotation {
  quotationNumber: string;

  policyholder: string;

  email: string;

  passportNumber?: string;

  dateOfBirth?: string;

  insuranceType: string;

  originCountry?: string;

  destination: string;

  destinationCity?: string;

  travelDates: string;

  travelStartDate?: string;

  travelEndDate?: string;

  travelDays?: number;

  coverages?: Coverage[];

  premium: number;

  totalPremium?: number;

  status:
    | 'PENDING'
    | 'COMPLETED'
    | 'APPROVAL REQUIRED'
    | 'POLICY ISSUED';

  documentsVerified?: boolean;

  paymentCompleted?: boolean;

  riskyRegion?: boolean;
}

@Component({
  selector: 'app-quotations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './quotations.html',
  styleUrl: './quotations.css'
})
export class Quotations implements OnInit {

  searchText = '';

  selectedStatus = 'ALL';

  quotations: Quotation[] = [];


  constructor(
    private router: Router
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadQuotations();

  }


  // =====================================================
  // LOAD QUOTATIONS
  // =====================================================

  loadQuotations(): void {

    const saved =
      localStorage.getItem(
        'travelInsuranceQuotations'
      );

    if (saved) {

      try {

        const parsed =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {

          this.quotations =
            parsed;

        } else {

          this.loadDemoQuotations();

        }

      } catch {

        this.loadDemoQuotations();

      }

    } else {

      this.loadDemoQuotations();

    }

  }


  // =====================================================
  // DEMO DATA
  // =====================================================

  loadDemoQuotations(): void {

    this.quotations = [

      {
        quotationNumber:
          'QT-2026-00124',

        policyholder:
          'Arun Kumar',

        email:
          'arun.kumar@email.com',

        passportNumber:
          'P1234567',

        dateOfBirth:
          '1996-04-15',

        insuranceType:
          'Travel Insurance',

        originCountry:
          'India',

        destination:
          'United Kingdom',

        destinationCity:
          'London',

        travelDates:
          '15 Sep 2026 - 28 Sep 2026',

        travelStartDate:
          '2026-09-15',

        travelEndDate:
          '2026-09-28',

        travelDays:
          14,

        premium:
          2650,

        totalPremium:
          2650,

        coverages: [

          {
            name: 'Medical',

            sumInsured:
              1000000,

            rate:
              0.20,

            premium:
              2000,

            description:
              'Emergency medical and hospitalisation expenses'
          },

          {
            name: 'Death',

            sumInsured:
              500000,

            rate:
              0.10,

            premium:
              500,

            description:
              'Accidental death benefit during the insured trip'
          },

          {
            name: 'Baggage',

            sumInsured:
              100000,

            rate:
              0.15,

            premium:
              150,

            description:
              'Loss or damage of checked-in baggage'
          }

        ],

        status:
          'PENDING',

        documentsVerified:
          false,

        paymentCompleted:
          false,

        riskyRegion:
          false

      },


      {
        quotationNumber:
          'QT-2026-00123',

        policyholder:
          'Meera Sharma',

        email:
          'meera.sharma@email.com',

        insuranceType:
          'Travel Insurance',

        destination:
          'Singapore',

        travelDates:
          '10 Sep 2026 - 18 Sep 2026',

        premium:
          3250,

        totalPremium:
          3250,

        status:
          'COMPLETED',

        documentsVerified:
          true,

        paymentCompleted:
          true,

        riskyRegion:
          false

      },


      {
        quotationNumber:
          'QT-2026-00122',

        policyholder:
          'Rahul Menon',

        email:
          'rahul.menon@email.com',

        insuranceType:
          'Travel Insurance',

        destination:
          'Australia',

        travelDates:
          '02 Oct 2026 - 20 Oct 2026',

        premium:
          6120,

        totalPremium:
          6120,

        status:
          'PENDING',

        documentsVerified:
          false,

        paymentCompleted:
          false,

        riskyRegion:
          false

      },


      {
        quotationNumber:
          'QT-2026-00121',

        policyholder:
          'Priya Nair',

        email:
          'priya.nair@email.com',

        insuranceType:
          'Travel Insurance',

        destination:
          'France',

        travelDates:
          '21 Sep 2026 - 30 Sep 2026',

        premium:
          3980,

        totalPremium:
          3980,

        status:
          'COMPLETED',

        documentsVerified:
          true,

        paymentCompleted:
          true,

        riskyRegion:
          false

      },


      {
        quotationNumber:
          'QT-2026-00120',

        policyholder:
          'Vikram Singh',

        email:
          'vikram.singh@email.com',

        insuranceType:
          'Travel Insurance',

        destination:
          'United States',

        travelDates:
          '05 Nov 2026 - 22 Nov 2026',

        premium:
          7350,

        totalPremium:
          7350,

        status:
          'PENDING',

        documentsVerified:
          false,

        paymentCompleted:
          false,

        riskyRegion:
          false

      }

    ];

  }


  // =====================================================
  // FILTER
  // =====================================================

  get filteredQuotations(): Quotation[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();

    return this.quotations.filter(
      quotation => {

        const matchesSearch =
          !search ||

          quotation.quotationNumber
            .toLowerCase()
            .includes(search) ||

          quotation.policyholder
            .toLowerCase()
            .includes(search) ||

          quotation.email
            .toLowerCase()
            .includes(search) ||

          quotation.destination
            .toLowerCase()
            .includes(search);


        const matchesStatus =
          this.selectedStatus === 'ALL' ||
          quotation.status ===
          this.selectedStatus;


        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );

  }


  // =====================================================
  // COUNTS
  // =====================================================

  get totalQuotations(): number {

    return this.quotations.length;

  }


  get pendingQuotations(): number {

    return this.quotations.filter(
      quotation =>
        quotation.status ===
        'PENDING'
    ).length;

  }


  get completedQuotations(): number {

    return this.quotations.filter(
      quotation =>
        quotation.status ===
        'COMPLETED'
    ).length;

  }


  // =====================================================
  // CREATE QUOTATION
  // =====================================================

  createQuotation(): void {

    this.router.navigate([
      '/underwriter/quotations/new'
    ]);

  }


  // =====================================================
  // VIEW QUOTATION
  // =====================================================

  viewQuotation(
    quotation: Quotation
  ): void {

    this.router.navigate([
      '/underwriter/quotations',
      quotation.quotationNumber
    ]);

  }


  // =====================================================
  // FILTER STATUS
  // =====================================================

  setStatus(
    status: string
  ): void {

    this.selectedStatus =
      status;

  }


  // =====================================================
  // STATUS CLASS
  // =====================================================

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'COMPLETED':
        return 'completed';

      case 'APPROVAL REQUIRED':
        return 'approval';

      case 'POLICY ISSUED':
        return 'issued';

      default:
        return 'pending';

    }

  }


  // =====================================================
  // INITIALS
  // =====================================================

  getInitials(
    name: string
  ): string {

    return name
      .split(' ')
      .map(
        part =>
          part.charAt(0)
      )
      .join('')
      .substring(0, 2)
      .toUpperCase();

  }


  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    window.history.back();

  }

}