import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { DealService } from '../core/deal.service';
import { Deal, PathGraph } from '../lib/tripsorter';
import { calcDealDiscountedTotal, calcDealDuration } from '../lib/helpers/calculators';

@Component({
  selector: 'deal-detail',
  templateUrl: './trip-search-result.component.html',
  styleUrls: ['./trip-search-result.component.css']
})
export class TripSearchResultComponent implements OnInit {
  deals: Deal[];
  currency: string;
  pathGraph: PathGraph;
  totalDuration: number;
  totalCost: number;

  constructor(
    private dealService: DealService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const departure = this.route.snapshot.paramMap.get('departure');
    const arrival = this.route.snapshot.paramMap.get('arrival');
    const preferFastest = this.route.snapshot.paramMap.get('preferFastest') === 'true';
    this.loadDeals(departure, arrival, preferFastest);

    this.dealService.getCurrency().then(c => this.currency = c);
  }

  async loadDeals(departure: string, arrival: string, preferFastest: boolean) {
    let pathGraph = await this.dealService.findPath(departure, arrival, preferFastest);

    this.deals = this.dealService.pathGraphToDealArray(pathGraph);

    let totals = this.deals.reduce(
      (acc, d) => {
        acc.totalCost += calcDealDiscountedTotal(d);
        acc.totalDuratin += calcDealDuration(d);

        return acc;
      },
      { totalCost: 0, totalDuratin: 0 }
    );

    this.totalCost = totals.totalCost;
    this.totalDuration = totals.totalDuratin;
  }

  goBack(): void {
    this.router.navigate(['/search', {
    }]);
  }
}
