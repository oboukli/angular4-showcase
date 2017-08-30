import { Deal } from '../tripsorter';

export const calcDiscountedTotal = (amount: number, discountPercent: number): number => {
    return amount - ((discountPercent / 100) * amount);
};

export const calcDealDiscountedTotal = (deal: Deal): number => {
    return calcDiscountedTotal(deal.cost, deal.discount);
};

export const calcDealDuration = (deal: Deal): number => {
    return (+deal.duration.h * 60) + (+deal.duration.m);
};
