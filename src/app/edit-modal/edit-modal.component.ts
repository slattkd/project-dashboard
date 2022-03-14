import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService, PROJECT } from '../data.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() projectData: PROJECT;
  dataCopy: PROJECT;
  allProjects?: PROJECT[];
  averageBudget: number = 0;
  difference: number = 0;
  newProject: PROJECT;

  constructor(
    public modalService: NgbActiveModal,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataCopy = this.projectData;
    this.allProjects = this.dataService.getProjects();
    if (this.allProjects && this.allProjects.length > 0) {
      const budgets: number[] = this.allProjects.map(each => each.budget);
      const average = (arr: number[]) => arr.reduce((a,b) => a + b, 0) / arr.length;

      this.averageBudget = average(budgets);
      this.difference = this.averageBudget - this.dataCopy.budget;
     
    }
  }

  newProjectData(proj: PROJECT) {
    this.newProject = proj;
  }
  

}
