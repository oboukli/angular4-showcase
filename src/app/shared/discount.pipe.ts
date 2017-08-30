import { Pipe, PipeTransform } from '@angular/core';

import { calcDiscountedTotal } from '../lib/helpers/calculators';

@Pipe({ name: 'discount' })
export class DiscountPipe implements PipeTransform {
    transform(amount: number, discountPercent: number): number {
        return calcDiscountedTotal(+amount, +discountPercent);
    }
}
