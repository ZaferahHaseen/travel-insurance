import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface QuotationFormData {
  travellerName: string;
  dateOfBirth: string;
  passportNumber: string;

  originCountry: string;
  destinationCountry: string;
  destinationCity: string;

  travelStartDate: string;
  travelEndDate: string;

  medicalSumInsured: number | null;
  deathSumInsured: number | null;
  baggageSumInsured: number | null;

  medicalPremium: number;
  deathPremium: number;
  baggagePremium: number;

  premium: number;
}

@Component({
  selector: 'app-quotation-form',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './quotation-form.html',
  styleUrl: './quotation-form.css'
})
export class QuotationForm {

  // =====================================================
  // FORM DATA
  // =====================================================

  formData: QuotationFormData = {

    travellerName: '',
    dateOfBirth: '',
    passportNumber: '',

    originCountry: '',
    destinationCountry: '',
    destinationCity: '',

    travelStartDate: '',
    travelEndDate: '',

    medicalSumInsured: null,
    deathSumInsured: null,
    baggageSumInsured: null,

    medicalPremium: 0,
    deathPremium: 0,
    baggagePremium: 0,

    premium: 0
  };


  // =====================================================
  // FORM STATE
  // =====================================================

  submitted = false;

  saved = false;

  quotationNumber = 'QT-2026-001';


  // =====================================================
  // DATE
  // =====================================================

  today = this.getToday();


  // =====================================================
  // COUNTRIES
  // =====================================================

  countries: string[] = [

    'India',
    'United Kingdom',
    'United States',
    'Canada',
    'Australia',
    'Singapore',
    'United Arab Emirates',
    'France',
    'Germany',
    'Italy',
    'Spain',
    'Switzerland',
    'Japan',
    'Thailand',
    'Malaysia'

  ];


  // =====================================================
  // COVERAGE RATES
  // =====================================================

  readonly medicalRate = 0.20;

  readonly deathRate = 0.10;

  readonly baggageRate = 0.05;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private router: Router
  ) {}


  // =====================================================
  // TODAY
  // =====================================================

  private getToday(): string {

    const date = new Date();

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      date.getDate()
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  // =====================================================
  // TRAVELLER AGE
  // =====================================================

  get travellerAge(): number | null {

    if (!this.formData.dateOfBirth) {
      return null;
    }

    const birthDate =
      new Date(this.formData.dateOfBirth);

    const today =
      new Date();

    let age =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDifference =
      today.getMonth() -
      birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (
        monthDifference === 0 &&
        today.getDate() < birthDate.getDate()
      )
    ) {

      age--;

    }

    return age >= 0 ? age : null;
  }


  // =====================================================
  // TRAVEL DAYS
  // =====================================================

  get travelDays(): number {

    if (
      !this.formData.travelStartDate ||
      !this.formData.travelEndDate
    ) {

      return 0;

    }

    const start =
      new Date(this.formData.travelStartDate);

    const end =
      new Date(this.formData.travelEndDate);

    const difference =
      end.getTime() -
      start.getTime();

    if (difference < 0) {
      return 0;
    }

    return Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    ) + 1;
  }


  // =====================================================
  // CALCULATE PREMIUM
  // =====================================================

  calculatePremium(): void {

    const medicalAmount =
      Number(this.formData.medicalSumInsured) || 0;

    const deathAmount =
      Number(this.formData.deathSumInsured) || 0;

    const baggageAmount =
      Number(this.formData.baggageSumInsured) || 0;


    // -----------------------------------------------------
    // Individual premiums
    // -----------------------------------------------------

    this.formData.medicalPremium =
      medicalAmount *
      (this.medicalRate / 100);


    this.formData.deathPremium =
      deathAmount *
      (this.deathRate / 100);


    this.formData.baggagePremium =
      baggageAmount *
      (this.baggageRate / 100);


    // -----------------------------------------------------
    // Total premium
    // -----------------------------------------------------

    this.formData.premium =
      this.formData.medicalPremium +
      this.formData.deathPremium +
      this.formData.baggagePremium;


    // Round to 2 decimal places

    this.formData.medicalPremium =
      Number(
        this.formData.medicalPremium.toFixed(2)
      );

    this.formData.deathPremium =
      Number(
        this.formData.deathPremium.toFixed(2)
      );

    this.formData.baggagePremium =
      Number(
        this.formData.baggagePremium.toFixed(2)
      );

    this.formData.premium =
      Number(
        this.formData.premium.toFixed(2)
      );
  }


  // =====================================================
  // VALIDATION
  // =====================================================

  isFormValid(): boolean {

    const travellerValid =
      !!this.formData.travellerName.trim();

    const dobValid =
      !!this.formData.dateOfBirth;

    const passportValid =
      !!this.formData.passportNumber.trim();


    const originValid =
      !!this.formData.originCountry;

    const destinationValid =
      !!this.formData.destinationCountry;

    const cityValid =
      !!this.formData.destinationCity.trim();


    const startDateValid =
      !!this.formData.travelStartDate;

    const endDateValid =
      !!this.formData.travelEndDate;


    const dateOrderValid =
      !this.formData.travelStartDate ||
      !this.formData.travelEndDate ||
      this.formData.travelEndDate >=
      this.formData.travelStartDate;


    const medicalValid =
      !!this.formData.medicalSumInsured &&
      this.formData.medicalSumInsured > 0;

    const deathValid =
      !!this.formData.deathSumInsured &&
      this.formData.deathSumInsured > 0;

    const baggageValid =
      !!this.formData.baggageSumInsured &&
      this.formData.baggageSumInsured > 0;


    return (
      travellerValid &&
      dobValid &&
      passportValid &&
      originValid &&
      destinationValid &&
      cityValid &&
      startDateValid &&
      endDateValid &&
      dateOrderValid &&
      medicalValid &&
      deathValid &&
      baggageValid
    );
  }


  // =====================================================
  // SAVE QUOTATION
  // =====================================================

  saveQuotation(): void {

    this.submitted = true;

    this.calculatePremium();


    if (!this.isFormValid()) {

      return;

    }


    // Generate quotation number

    const quotationCount =
      Number(
        localStorage.getItem(
          'quotationCount'
        ) || '0'
      ) + 1;


    localStorage.setItem(
      'quotationCount',
      quotationCount.toString()
    );


    this.quotationNumber =
      `QT-2026-${String(
        quotationCount
      ).padStart(3, '0')}`;


    // -----------------------------------------------------
    // Save quotation
    // -----------------------------------------------------

    const quotation = {

      quotationNumber:
        this.quotationNumber,

      travellerName:
        this.formData.travellerName,

      dateOfBirth:
        this.formData.dateOfBirth,

      passportNumber:
        this.formData.passportNumber,

      originCountry:
        this.formData.originCountry,

      destinationCountry:
        this.formData.destinationCountry,

      destinationCity:
        this.formData.destinationCity,

      travelStartDate:
        this.formData.travelStartDate,

      travelEndDate:
        this.formData.travelEndDate,

      travelDays:
        this.travelDays,

      coverages: [

        {
          coverage: 'Medical',
          sumInsured:
            this.formData.medicalSumInsured,
          rate:
            this.medicalRate,
          premium:
            this.formData.medicalPremium
        },

        {
          coverage: 'Death',
          sumInsured:
            this.formData.deathSumInsured,
          rate:
            this.deathRate,
          premium:
            this.formData.deathPremium
        },

        {
          coverage: 'Baggage',
          sumInsured:
            this.formData.baggageSumInsured,
          rate:
            this.baggageRate,
          premium:
            this.formData.baggagePremium
        }

      ],

      totalPremium:
        this.formData.premium,

      status:
        'PENDING',

      documentVerification:
        false,

      paymentCompleted:
        false,

      isRiskyRegion:
        false,

      createdAt:
        new Date().toISOString()

    };


    // -----------------------------------------------------
    // Get existing quotations
    // -----------------------------------------------------

    const existingQuotations =
      JSON.parse(
        localStorage.getItem(
          'quotations'
        ) || '[]'
      );


    existingQuotations.push(
      quotation
    );


    // -----------------------------------------------------
    // Save
    // -----------------------------------------------------

    localStorage.setItem(
      'quotations',
      JSON.stringify(
        existingQuotations
      )
    );


    this.saved = true;


    // Scroll to top after saving

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }


  // =====================================================
  // RESET FORM
  // =====================================================

  resetForm(): void {

    this.formData = {

      travellerName: '',
      dateOfBirth: '',
      passportNumber: '',

      originCountry: '',
      destinationCountry: '',
      destinationCity: '',

      travelStartDate: '',
      travelEndDate: '',

      medicalSumInsured: null,
      deathSumInsured: null,
      baggageSumInsured: null,

      medicalPremium: 0,
      deathPremium: 0,
      baggagePremium: 0,

      premium: 0

    };


    this.submitted = false;

    this.saved = false;

  }


  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    this.router.navigate([
      '/underwriter/quotations'
    ]);

  }


  // =====================================================
  // VIEW QUOTATIONS
  // =====================================================

  viewQuotations(): void {

    this.router.navigate([
      '/underwriter/quotations'
    ]);

  }

}