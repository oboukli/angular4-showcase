"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcDiscountedTotal = function (amount, discountPercent) {
    return amount - ((discountPercent / 100) * amount);
};
exports.calcDealDiscountedTotal = function (deal) {
    return exports.calcDiscountedTotal(deal.cost, deal.discount);
};
exports.calcDealDuration = function (deal) {
    return (+deal.duration.h * 60) + (+deal.duration.m);
};
//# sourceMappingURL=calculators.js.map