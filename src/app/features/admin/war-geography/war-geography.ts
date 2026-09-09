import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';

import * as L from 'leaflet';


interface WarRegion {
  code: string;
  name: string;
  lat: number;
  lng: number;
}


@Component({
  selector: 'app-war-geography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './war-geography.html',
  styleUrl: './war-geography.css'
})


export class WarGeography implements AfterViewInit, OnDestroy {

  private map!: L.Map;

  private markers: L.Marker[] = [];


  selectedRegions: WarRegion[] = [];


  /*
   * Available countries/regions.
   *
   * Later these can come from your backend/API.
   */
  regions: WarRegion[] = [

    {
      code: 'UA',
      name: 'Ukraine',
      lat: 49.0,
      lng: 32.0
    },

    {
      code: 'IL',
      name: 'Israel',
      lat: 31.5,
      lng: 34.8
    },

    {
      code: 'PS',
      name: 'Palestine',
      lat: 31.9,
      lng: 35.2
    },

    {
      code: 'SY',
      name: 'Syria',
      lat: 35.0,
      lng: 38.9
    },

    {
      code: 'IQ',
      name: 'Iraq',
      lat: 33.2,
      lng: 43.7
    },

    {
      code: 'YE',
      name: 'Yemen',
      lat: 15.5,
      lng: 48.5
    },

    {
      code: 'AF',
      name: 'Afghanistan',
      lat: 33.9,
      lng: 67.7
    },

    {
      code: 'SD',
      name: 'Sudan',
      lat: 15.5,
      lng: 30.2
    },

    {
      code: 'MM',
      name: 'Myanmar',
      lat: 21.9,
      lng: 95.9
    },

    {
      code: 'SO',
      name: 'Somalia',
      lat: 5.1,
      lng: 46.2
    }

  ];


  ngAfterViewInit(): void {

    this.initializeMap();

  }


  private initializeMap(): void {

    /*
     * World geographical boundaries.
     *
     * Prevents the user from dragging the map
     * outside the valid world area.
     */
    const worldBounds = L.latLngBounds(
      [-85, -180],
      [85, 180]
    );


    this.map = L.map('war-map', {

      center: [20, 10],

      zoom: 2,

      minZoom: 2,

      maxZoom: 6,

      maxBounds: worldBounds,

      maxBoundsViscosity: 1.0,

      worldCopyJump: false,

      zoomControl: true,

      attributionControl: true

    });


    /*
     * English OpenStreetMap map.
     */
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',

        maxZoom: 19,

        noWrap: true
      }
    ).addTo(this.map);


    /*
     * Make sure the complete world stays
     * inside the map when the page loads.
     */
    this.map.fitBounds(worldBounds, {
      padding: [10, 10]
    });


    /*
     * Add selectable country markers.
     */
    this.regions.forEach((region) => {

      const marker = L.marker(
        [region.lat, region.lng],
        {
          icon: this.createMarkerIcon(false),

          keyboard: true
        }
      );


      marker.addTo(this.map);


      marker.bindTooltip(
        this.createTooltip(region, false),
        {
          direction: 'top',

          offset: [0, -10],

          opacity: 0.95
        }
      );


      marker.on('click', () => {

        this.toggleRegion(region);

      });


      this.markers.push(marker);

    });


    /*
     * Fix Leaflet sizing when the page/layout
     * has finished rendering.
     */
    setTimeout(() => {

      this.map.invalidateSize();

    }, 150);

  }


  private createMarkerIcon(
    selected: boolean
  ): L.DivIcon {

    return L.divIcon({

      className: selected
        ? 'war-marker-wrapper selected-marker'
        : 'war-marker-wrapper',

      html: `
        <div class="war-marker">
          <span></span>
        </div>
      `,

      iconSize: [26, 26],

      iconAnchor: [13, 13],

      tooltipAnchor: [0, -13]

    });

  }


  private createTooltip(
    region: WarRegion,
    selected: boolean
  ): string {

    return `
      <div class="map-tooltip">
        <strong>${region.name}</strong>
        <span>${region.code}</span>
        <small>
          ${selected ? 'Click to remove' : 'Click to select'}
        </small>
      </div>
    `;

  }


  toggleRegion(region: WarRegion): void {

    const alreadySelected =
      this.isSelected(region.code);


    if (alreadySelected) {

      this.selectedRegions =
        this.selectedRegions.filter(
          item => item.code !== region.code
        );

    } else {

      this.selectedRegions = [
        ...this.selectedRegions,
        region
      ];

    }


    this.updateMarkerStyles();

  }


  removeRegion(code: string): void {

    this.selectedRegions =
      this.selectedRegions.filter(
        region => region.code !== code
      );


    this.updateMarkerStyles();

  }


  isSelected(code: string): boolean {

    return this.selectedRegions.some(
      region => region.code === code
    );

  }


  private updateMarkerStyles(): void {

    this.regions.forEach(
      (region, index) => {

        const marker = this.markers[index];

        if (!marker) {
          return;
        }


        const selected =
          this.isSelected(region.code);


        marker.setIcon(
          this.createMarkerIcon(selected)
        );


        marker.bindTooltip(
          this.createTooltip(
            region,
            selected
          ),
          {
            direction: 'top',

            offset: [0, -10],

            opacity: 0.95
          }
        );

      }
    );

  }


  saveRegions(): void {

    const regionCodes =
      this.selectedRegions.map(
        region => region.code
      );


    console.log(
      'War-risk regions:',
      regionCodes
    );


    alert(
      `${this.selectedRegions.length} war-risk region(s) saved successfully.`
    );

  }


  ngOnDestroy(): void {

    if (this.map) {

      this.map.remove();

    }

  }

}