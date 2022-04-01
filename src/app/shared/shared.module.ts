import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { DateRangePipe } from './date-range.pipe';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { Project } from '../models/project';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot( {  })
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