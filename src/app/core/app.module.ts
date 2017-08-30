import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCoreModule,
  MdIconModule,
  MdInputModule,
  MdSelectModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from '../app.component';

import { DealService } from './deal.service';

import { NotEqualValidator } from '../shared/not-equal-validator.directive';
import { DiscountPipe } from '../shared/discount.pipe';
import { DurationPipe } from '../shared/duration.pipe';

import { TripSearchComponent } from '../trip-search/trip-search.component';
import { TripSearchResultComponent } from '../trip-search-result/trip-search-result.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCoreModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NotEqualValidator,
    DiscountPipe,
    DurationPipe,
    TripSearchComponent,
    TripSearchResultComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    DealService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
