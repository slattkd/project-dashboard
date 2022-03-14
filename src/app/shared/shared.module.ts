import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { DateRangePipe } from './date-range.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FilterPipe,
    DateRangePipe,
  ],
  exports: [
    FilterPipe,
    DateRangePipe
  ],
  providers: []
})
export class SharedModule { }