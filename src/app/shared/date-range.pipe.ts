import { newArray } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PROJECT } from '../data.service';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {

  constructor() {
  }

  transform(arr: PROJECT[], createDate: NgbDateStruct, endDate: NgbDateStruct): PROJECT[] {
    // mm/dd/yyy
    if (createDate && endDate) {
      return arr.filter(each => this.after(this.convertDate(each.created), createDate) && this.before(this.convertDate(each.created), endDate));
    }
    if (createDate) {
      return arr.filter(each => this.after(this.convertDate(each.created), createDate));
    }
    if (endDate) {
      return arr.filter(each => this.before(this.convertDate(each.created), endDate));
    }
    return arr;
  }

  convertDate(date: any): NgbDateStruct {
    let parts = date.split('/');
    return { day: parseInt(parts[1]), month: parseInt(parts[0]), year: parseInt(parts[2])}
  }

  after(date: NgbDateStruct, compare: NgbDateStruct): boolean {
    return date.year > compare.year
    || (date.year == compare.year && date.month > compare.month)
    || (date.year == compare.year && date.month == compare.month && date.day >= compare.day);
  }

  before(date: NgbDateStruct, compare: NgbDateStruct): boolean {
    return date.year < compare.year
    || (date.year == compare.year && date.month < compare.month)
    || (date.year == compare.year && date.month == compare.month && date.day < compare.day);
  }
}
