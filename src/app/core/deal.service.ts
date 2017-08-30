import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { graphPathfinder } from '../lib/pathfinder/graphPathfinder';

import { Deal, PathGraph, WeighProvider } from '../lib/tripsorter';
import { calcDealDuration, calcDealDiscountedTotal } from '../lib/helpers/calculators';

@Injectable()
export class DealService {
    private dataEndpoint = 'assets/data/response.json';
    private data: any;

    constructor(private http: Http) { }

    loadData(): Promise<void> {
        // TODO: if NOT empty
        return this.http.get(this.dataEndpoint)
            .toPromise()
            .then(response => {
                this.data = response.json();
            })
            .catch(this.handleError);
    }

    getDeals(): Promise<Deal[]> {
        return this.loadData().then(() => {
            return this.data.deals;
        });
    }

    getDealsFiltered(departure?: string, arrival?: string, preferFastest?: boolean): Promise<Deal[]> {
        return this.loadData().then(() => {
            let deals: Deal[];
            if (departure) {
                deals = this.data.deals.filter(
                    (e: Deal, i: number, a: Deal[]) => e && e.departure === departure && e.arrival === arrival
                );
            }
            return this.data.deals;
        });
    }

    getDepartures(): Promise<string[]> {
        return this.loadData().then(() => {
            const deals: Deal[] = this.data.deals;
            const departures: string[] = deals.map(i => i.departure);

            // Unique departures
            return departures.filter((e, i, a) => e && a.indexOf(e) === i);
        });
    }

    getArrivals(): Promise<string[]> {
        return this.loadData().then(() => {
            const deals: Deal[] = this.data.deals;
            const arrivals: string[] = deals.map(i => i.arrival);

            // Unique arrivals
            return arrivals.filter((e, i, a) => e && a.indexOf(e) === i);
        });
    }

    getCurrency(): Promise<string> {
        return this.loadData().then(() => this.data.currency);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    async findPath(departure: string, arrival: string, preferFastest: boolean): Promise<PathGraph> {
        await this.loadData();
        const deals = this.data.deals;
        const weightProvider = this.weighProviderFactory(preferFastest);

        const graph = this.buildGraph(deals, weightProvider);
        const route = graphPathfinder(graph);
        const path = route.findPath(departure, arrival);
        return path;
    }

    public pathGraphToDealArray(path: PathGraph): Deal[] {
        return path.path.map(obj => {
            return obj.value.o;
        });
    }

    private weighProviderFactory(preferFastest: boolean): WeighProvider {
        if (preferFastest) {
            return this.weighDuration;
        } else {
            return this.weighDiscountedCost;
        }
    }

    private weighDiscountedCost(deal: Deal): number {
        return calcDealDiscountedTotal(deal);
    }

    private weighDuration(deal: Deal): number {
        return calcDealDuration(deal);
    }

    private buildGraph(deals: Deal[], weightProvider: any) {
        let graph = new Map();
        let departure;
        let weight: number;
        let currentWeight: number;
        deals.forEach((d) => {
            departure = d.departure;
            weight = weightProvider(d);

            if (!graph.has(departure)) {
                graph.set(departure, new Map());
                currentWeight = Number.POSITIVE_INFINITY;
            }

            if (weight <= currentWeight) {
                currentWeight = weight;
                graph.get(departure).set(d.arrival, { weight: weight, o: d });
            }
        });

        return graph;
    }
}
