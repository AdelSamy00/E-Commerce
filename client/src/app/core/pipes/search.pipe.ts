import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObjects:any[],keyword:string): any[] {
    return arrayOfObjects.filter((item)=>item.title.toLowerCase().includes(keyword.toLowerCase()) || item.title_ar.toLowerCase().includes(keyword.toLowerCase()));
  }

}
