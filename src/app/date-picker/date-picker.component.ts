import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  model: NgbDateStruct | undefined;
  @Input() clear:Subject<boolean>;
  @Output() onDateUpdate = new EventEmitter<NgbDateStruct>();

  ngOnInit() {
    this.clear.subscribe((event: any) => {
      console.log(event);
      if (event === true) {
        this.model = undefined;
      }
    });
  }

  updateDate() {
    this.onDateUpdate.emit(this.model);
  }

  clearInput(): void {
    this.model = undefined;
  }
}