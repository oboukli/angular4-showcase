import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
    transform(minutes: number, separator: string): string {
        const hrs = this.pad(Math.floor(+minutes / 60));
        const mins = this.pad(minutes % 60);
        return `${hrs}${separator}${mins}`;
    }

    private pad(n: number): string {
        return `${(n < 10) ? '0' : ''}${n}`;
    }
}
