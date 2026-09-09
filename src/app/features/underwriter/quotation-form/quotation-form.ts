import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  sumInsured: number | null;
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
    sumInsured: null,
    premium: 0
  };


  // =====================================================
  // UI STATE
  // =====================================================

  submitted = false;

  saved = false;

  quotationNumber = '';


  // =====================================================
  // TODAY
  // =====================================================

  today = new Date()
    .toISOString()
    .split('T')[0];


  // =====================================================
  // COUNTRY LIST
  // =====================================================

  countries: string[] = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Singapore',
    'United Arab Emirates',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Switzerland',
    'Japan',
    'Thailand',
    'Malaysia'
  ];


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private router: Router
  ) {}


  // =====================================================
  // TRAVELLER AGE
  // =====================================================

  get travellerAge(): number | null {

    if (!this.formData.dateOfBirth) {
      return null;
    }

    const dob = new Date(
      this.formData.dateOfBirth
    );

    const today = new Date();

    let age =
      today.getFullYear() -
      dob.getFullYear();

    const monthDifference =
      today.getMonth() -
      dob.getMonth();

    if (
      monthDifference < 0 ||
      (
        monthDifference === 0 &&
        today.getDate() < dob.getDate()
      )
    ) {
      age--;
    }

    return Math.max(age, 0);
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

    const start = new Date(
      this.formData.travelStartDate
    );

    const end = new Date(
      this.formData.travelEndDate
    );

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
  // PREMIUM CALCULATION
  // =====================================================

  calculatePremium(): void {

    if (!this.formData.sumInsured) {

      this.formData.premium = 0;

      return;
    }

    /*
     * Frontend demonstration calculation.
     *
     * Final premium will eventually be
     * calculated/confirmed through the API.
     */

    const basePremium =
      this.formData.sumInsured * 0.002;

    const durationFactor =
      this.travelDays > 0
        ? Math.max(
            this.travelDays / 7,
            1
          )
        : 1;

    this.formData.premium =
      Math.round(
        basePremium *
        durationFactor
      );
  }


  // =====================================================
  // FORM VALIDATION
  // =====================================================

  get isFormValid(): boolean {

    return !!(
      this.formData.travellerName.trim() &&

      this.formData.dateOfBirth &&

      this.formData.passportNumber.trim() &&

      this.formData.originCountry &&

      this.formData.destinationCountry &&

      this.formData.destinationCity.trim() &&

      this.formData.travelStartDate &&

      this.formData.travelEndDate &&

      this.formData.sumInsured &&

      this.formData.sumInsured > 0 &&

      this.formData.travelEndDate >=
        this.formData.travelStartDate
    );
  }


  // =====================================================
  // SAVE QUOTATION
  // =====================================================

  saveQuotation(): void {

    this.submitted = true;

    if (!this.isFormValid) {
      return;
    }

    this.calculatePremium();

    /*
     * SRS:
     *
     * Quotation number format:
     * QT-YYYY-######
     *
     * Temporary frontend generation.
     * Backend should generate final number.
     */

    const year =
      new Date().getFullYear();

    const randomNumber =
      Math.floor(
        100000 +
        Math.random() * 900000
      );

    this.quotationNumber =
      `QT-${year}-${randomNumber}`;

    this.saved = true;
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

      sumInsured: null,

      premium: 0
    };

    this.submitted = false;

    this.saved = false;

    this.quotationNumber = '';
  }


  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    this.router.navigate([
      '/underwriter/dashboard'
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