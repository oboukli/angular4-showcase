"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var flex_layout_1 = require("@angular/flex-layout");
var material_1 = require("@angular/material");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("../app.component");
var deal_service_1 = require("./deal.service");
var not_equal_validator_directive_1 = require("../shared/not-equal-validator.directive");
var discount_pipe_1 = require("../shared/discount.pipe");
var duration_pipe_1 = require("../shared/duration.pipe");
var trip_search_component_1 = require("../trip-search/trip-search.component");
var trip_search_result_component_1 = require("../trip-search-result/trip-search-result.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                material_1.MdButtonModule,
                material_1.MdButtonToggleModule,
                material_1.MdCardModule,
                material_1.MdCoreModule,
                material_1.MdIconModule,
                material_1.MdInputModule,
                material_1.MdSelectModule,
                flex_layout_1.FlexLayoutModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                not_equal_validator_directive_1.NotEqualValidator,
                discount_pipe_1.DiscountPipe,
                duration_pipe_1.DurationPipe,
                trip_search_component_1.TripSearchComponent,
                trip_search_result_component_1.TripSearchResultComponent
            ],
            providers: [
                { provide: core_1.LOCALE_ID, useValue: 'fr-FR' },
                deal_service_1.DealService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map