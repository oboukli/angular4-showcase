import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripSearchComponent } from '../trip-search/trip-search.component';
import { TripSearchResultComponent } from '../trip-search-result/trip-search-result.component';

const routes: Routes = [
    { path: '', redirectTo: '/search', pathMatch: 'full' },
    { path: 'search', component: TripSearchComponent },
    { path: 'deals', component: TripSearchResultComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
