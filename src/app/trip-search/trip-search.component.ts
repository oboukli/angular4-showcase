import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DealService } from '../core/deal.service';

@Component({
  selector: 'trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.css'],
  providers: [DealService]
})
export class TripSearchComponent implements OnInit {
  departures: string[];
  arrivals: string[];
  selectedDeparture: string;
  selectedArrival: string;
  preferFastest: boolean;

  constructor(
    private router: Router,
    private dealService: DealService
  ) { }

  ngOnInit(): void {
    this.loadDepartures();
    this.loadArrivals();
  }

  async loadDepartures(): Promise<void> {
    this.departures = (
      await this.dealService.getDepartures()
    ).sort();
  }

  async loadArrivals(): Promise<void> {
    this.arrivals = (
      await this.dealService.getArrivals()
    ).sort();
  }

  searchDeals(): void {
    this.router.navigate(['/deals', {
      departure: this.selectedDeparture,
      arrival: this.selectedArrival,
      preferFastest: String(this.preferFastest)
    }]);
  }
}
