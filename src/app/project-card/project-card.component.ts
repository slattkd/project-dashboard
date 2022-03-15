import { Component, OnInit, Input } from '@angular/core';
import { PROJECT } from '../data.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit{

  @Input() projectData: PROJECT;

  constructor() { }

  ngOnInit(): void {  
  }
}
