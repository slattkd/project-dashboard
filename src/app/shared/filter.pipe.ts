import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    return items.filter(o => Object.keys(o).some(k => typeof o[k] == 'string' && o[k].toLowerCase().includes(searchText.toLowerCase())));
  }
}

