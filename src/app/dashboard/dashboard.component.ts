import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataService, PROJECT } from '../data.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ProjectCardComponent } from '../project-card/project-card.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: PROJECT[] | [];
  loading: boolean = false;
  searchTerm: string = '';
  selectedProject: PROJECT | null;
  endDate: any;
  startDate: any;
  onClear:Subject<any> = new Subject();

  constructor(
    private dataService: DataService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.data = this.dataService.getProjects();
  }

  updateStartDate(e: any) {
    this.startDate = e;
    console.log('start date', e);
  }

  updateEndDate(e: any) {
    this.endDate = e;
    console.log('end date', e);
  }

  editProject(proj: PROJECT) {
    console.log("edit", proj);
  }

  clearSearch(): void {
    this.endDate = null;
    this.startDate = null;
    this.onClear.next(true);
    this.searchTerm = '';
  }

  open(content: PROJECT) {
    this.selectedProject = content;
    const modal = this.modalService.open(EditModalComponent, {size: 'lg'});
    modal.componentInstance.projectData = content;
    modal.result.then((result) => {
      console.log(result);
    }, (reason) => {
      this.getDismissReason(reason)
    });
  }

  openCreate() {
    let newProject = {
      title: 'New Project',
      division: '',
      project_owner: 'Current User',
      budget: 0,
      status: 'Pending',
      created: '',
      modified: ''
    };
    this.selectedProject = newProject;
    const modal = this.modalService.open(EditModalComponent, {size: 'lg'});
    modal.componentInstance.projectData = newProject;
    modal.result.then((result) => {
      console.log(result);
    }, (reason) => {
      this.getDismissReason(reason)
    });
  }

  private getDismissReason(reason: any): void {
    console.log('close modal', reason);
    if (reason == 'Delete') {
      if (this.selectedProject !== null) {
        this.data = this.dataService.deleteProject(this.selectedProject);
      }
    } else if (reason == 'Cancel' || reason == 'Cross click' || reason == 0) {
      this.selectedProject = null;
    } else if (reason && reason.created) {
      console.log('update');
      if (this.selectedProject !== null) {
        this.data = this.dataService.updateProject(this.selectedProject, reason);
      }
    }
    else if (!reason.created || (reason.created && !reason.created.length)) {
      console.log('create');
      this.data = this.dataService.createProject(reason);
    }
    this.selectedProject = null;
  }

  public downloadCSV() {
      let array = typeof this.data != 'object' ? JSON.parse(this.data) : this.data;
      let str = '';

      for (var i = 0; i < array.length; i++) {
        let line = '';

        for (var index in array[i]) {
            line += array[i][index] + ',';
        }

        line.slice(0,line.length - 1); 
        str += line + '\r\n';
      }
      window.open( "data:text/csv;charset=utf-8," + escape(str))
  }

}
