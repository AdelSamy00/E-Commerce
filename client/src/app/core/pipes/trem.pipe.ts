import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trem',
  standalone: true
})
export class TremPipe implements PipeTransform {

  transform(text: string,limits: number): string {
    return text.split(' ',limits).join(' ');
  }

}
