import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Coverage {
  name: string;
  sumInsured: number;
  rate: number;
  premium: number;
  description?: string;
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
  selector: 'app-quotation-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './quotation-details.html',
  styleUrl: './quotation-details.css'
})
export class QuotationDetails implements OnInit {

  quotation: Quotation | null = null;

  quotationNumber = '';

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.quotationNumber =
      this.route.snapshot.paramMap.get(
        'quotationNumber'
      ) || '';

    this.loadQuotation();

  }


  // =====================================================
  // LOAD QUOTATION
  // =====================================================

  loadQuotation(): void {

    const saved =
      localStorage.getItem(
        'travelInsuranceQuotations'
      );

    if (saved) {

      try {

        const quotations:
          Quotation[] =
          JSON.parse(saved);

        if (Array.isArray(quotations)) {

          this.quotation =
            quotations.find(
              quotation =>
                quotation.quotationNumber ===
                this.quotationNumber
            ) || null;

        }

      } catch {

        this.quotation = null;

      }

    }

    /*
     * If the quotation is not stored in localStorage,
     * use demo quotation data so the screen can still
     * be viewed during frontend development.
     */

    if (!this.quotation) {

      this.loadDemoQuotation();

    }

    this.loading = false;

  }


  // =====================================================
  // DEMO QUOTATION
  // =====================================================

  loadDemoQuotation(): void {

    if (
      this.quotationNumber !==
      'QT-2026-00124'
    ) {

      return;

    }

    this.quotation = {

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

      premium:
        2650,

      totalPremium:
        2650,

      status:
        'PENDING',

      documentsVerified:
        false,

      paymentCompleted:
        false,

      riskyRegion:
        false

    };

  }


  // =====================================================
  // TOTAL PREMIUM
  // =====================================================

  get totalPremium(): number {

    if (!this.quotation) {

      return 0;

    }

    if (
      this.quotation.totalPremium !==
      undefined
    ) {

      return this.quotation.totalPremium;

    }

    return this.quotation.premium;

  }


  // =====================================================
  // DOCUMENT VERIFICATION
  // =====================================================

  verifyDocuments(): void {

    if (!this.quotation) {

      return;

    }

    this.router.navigate([
      '/underwriter/quotations',
      this.quotation.quotationNumber,
      'documents'
    ]);

  }


  // =====================================================
  // PAYMENT
  // =====================================================

  makePayment(): void {

    if (!this.quotation) {

      return;

    }

    this.router.navigate([
      '/underwriter/quotations',
      this.quotation.quotationNumber,
      'payment'
    ]);

  }


  // =====================================================
  // CONVERT TO POLICY
  // =====================================================

  convertToPolicy(): void {

    if (!this.quotation) {

      return;

    }

    /*
     * Both document verification and payment
     * must be completed.
     */

    if (
      !this.quotation.documentsVerified ||
      !this.quotation.paymentCompleted
    ) {

      return;

    }


    /*
     * Risky / war region quotations must go
     * to the approver instead of directly
     * becoming a policy.
     */

    if (this.quotation.riskyRegion) {

      this.quotation.status =
        'APPROVAL REQUIRED';

      this.saveQuotation();

      return;

    }


    /*
     * Normal quotation can become a policy.
     */

    this.quotation.status =
      'POLICY ISSUED';

    this.saveQuotation();

  }


  // =====================================================
  // SAVE
  // =====================================================

  saveQuotation(): void {

    if (!this.quotation) {

      return;

    }

    const saved =
      localStorage.getItem(
        'travelInsuranceQuotations'
      );

    let quotations: Quotation[] = [];

    if (saved) {

      try {

        const parsed =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {

          quotations = parsed;

        }

      } catch {

        quotations = [];

      }

    }


    const index =
      quotations.findIndex(
        quotation =>
          quotation.quotationNumber ===
          this.quotation!.quotationNumber
      );


    if (index >= 0) {

      quotations[index] =
        this.quotation;

    } else {

      quotations.push(
        this.quotation
      );

    }


    localStorage.setItem(
      'travelInsuranceQuotations',
      JSON.stringify(quotations)
    );

  }


  // =====================================================
  // STATUS
  // =====================================================

  get statusText(): string {

    if (!this.quotation) {

      return '';

    }

    return this.quotation.status;

  }


  get statusClass(): string {

    if (!this.quotation) {

      return '';

    }

    switch (
      this.quotation.status
    ) {

      case 'COMPLETED':
        return 'completed';

      case 'POLICY ISSUED':
        return 'issued';

      case 'APPROVAL REQUIRED':
        return 'approval';

      default:
        return 'pending';

    }

  }


  // =====================================================
  // INITIALS
  // =====================================================

  get initials(): string {

    if (!this.quotation) {

      return '';

    }

    return this.quotation.policyholder
      .split(' ')
      .map(
        name =>
          name.charAt(0)
      )
      .join('')
      .substring(0, 2)
      .toUpperCase();

  }


  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    this.router.navigate([
      '/underwriter/quotations'
    ]);

  }

}