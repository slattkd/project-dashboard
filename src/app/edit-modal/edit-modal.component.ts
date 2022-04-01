import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() projectData: Project;
  dataCopy: Project;
  allProjects?: Project[];
  averageBudget: number = 0;
  difference: number = 0;
  newProject: Project;
  validity: boolean = false;
  deleteMessage = 'Delete';

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

  newProjectData(proj: Project) {
    this.newProject = proj;
  }
  
  updateValidity(val: boolean) {
    // dont allow archive edits
    let archived = this.dataCopy.status === 'archived'
    this.validity = val && !archived;
  }

  // verify delete
  deleteStep(): void {
    if (this.deleteMessage === 'Delete') {
      this.deleteMessage = 'Are you sure?';
      return;
    }
    this.modalService.dismiss('Delete')
  }

}
