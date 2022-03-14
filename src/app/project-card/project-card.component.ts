import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { PROJECT } from '../data.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit, OnChanges {

  @Input() projectData: PROJECT;

  constructor() { }

  ngOnInit(): void {
    if (this.projectData) {
      console.log('data is available');
    } else {
      console.log('no data');
    }
    
  }

  ngOnChanges(): void {
  }

}
