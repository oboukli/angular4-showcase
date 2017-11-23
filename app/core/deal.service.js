"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var graphPathfinder_1 = require("../lib/pathfinder/graphPathfinder");
var calculators_1 = require("../lib/helpers/calculators");
var DealService = /** @class */ (function () {
    function DealService(http) {
        this.http = http;
        this.dataEndpoint = 'assets/data/response.json';
    }
    DealService.prototype.loadData = function () {
        var _this = this;
        // TODO: if NOT empty
        return this.http.get(this.dataEndpoint)
            .toPromise()
            .then(function (response) {
            _this.data = response.json();
        })
            .catch(this.handleError);
    };
    DealService.prototype.getDeals = function () {
        var _this = this;
        return this.loadData().then(function () {
            return _this.data.deals;
        });
    };
    DealService.prototype.getDealsFiltered = function (departure, arrival, preferFastest) {
        var _this = this;
        return this.loadData().then(function () {
            var deals;
            if (departure) {
                deals = _this.data.deals.filter(function (e, i, a) { return e && e.departure === departure && e.arrival === arrival; });
            }
            return _this.data.deals;
        });
    };
    DealService.prototype.getDepartures = function () {
        var _this = this;
        return this.loadData().then(function () {
            var deals = _this.data.deals;
            var departures = deals.map(function (i) { return i.departure; });
            // Unique departures
            return departures.filter(function (e, i, a) { return e && a.indexOf(e) === i; });
        });
    };
    DealService.prototype.getArrivals = function () {
        var _this = this;
        return this.loadData().then(function () {
            var deals = _this.data.deals;
            var arrivals = deals.map(function (i) { return i.arrival; });
            // Unique arrivals
            return arrivals.filter(function (e, i, a) { return e && a.indexOf(e) === i; });
        });
    };
    DealService.prototype.getCurrency = function () {
        var _this = this;
        return this.loadData().then(function () { return _this.data.currency; });
    };
    DealService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    DealService.prototype.findPath = function (departure, arrival, preferFastest) {
        return __awaiter(this, void 0, void 0, function () {
            var deals, weightProvider, graph, route, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.sent();
                        deals = this.data.deals;
                        weightProvider = this.weighProviderFactory(preferFastest);
                        graph = this.buildGraph(deals, weightProvider);
                        route = graphPathfinder_1.graphPathfinder(graph);
                        path = route.findPath(departure, arrival);
                        return [2 /*return*/, path];
                }
            });
        });
    };
    DealService.prototype.pathGraphToDealArray = function (path) {
        return path.path.map(function (obj) {
            return obj.value.o;
        });
    };
    DealService.prototype.weighProviderFactory = function (preferFastest) {
        if (preferFastest) {
            return this.weighDuration;
        }
        else {
            return this.weighDiscountedCost;
        }
    };
    DealService.prototype.weighDiscountedCost = function (deal) {
        return calculators_1.calcDealDiscountedTotal(deal);
    };
    DealService.prototype.weighDuration = function (deal) {
        return calculators_1.calcDealDuration(deal);
    };
    DealService.prototype.buildGraph = function (deals, weightProvider) {
        var graph = new Map();
        var departure;
        var weight;
        var currentWeight;
        deals.forEach(function (d) {
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
    };
    DealService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DealService);
    return DealService;
}());
exports.DealService = DealService;
//# sourceMappingURL=deal.service.js.map