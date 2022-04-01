import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';
import { DataService} from '../data.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../models/project';
import { select, Store } from '@ngrx/store';
import { selectProjects } from '../project/store/selector/project.selectors';
import { ProjectState } from '../project/store/reducer/project.reducer';  
import { initProjects, addProject } from '../project.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: Project[] | Project[] | [];
  loading: boolean = false;
  searchTerm: string = '';
  selectedProject: Project | null;
  endDate: any;
  startDate: any;
  onClear:Subject<any> = new Subject();
  projects$: Observable<Project[]>;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private store: Store<ProjectState>
    ) {
      this.projects$ = this.store.pipe(select(selectProjects));
     }

  ngOnInit(): void {
    this.data = this.dataService.getProjects();
    this.store.dispatch(initProjects(this.data));
  }
  updateStartDate(e: any) {
    this.startDate = e;
  }

  updateEndDate(e: any) {
    this.endDate = e;
  }

  editProject(proj: Project) {
    console.log("edit", proj);
  }

  clearSearch(): void {
    this.endDate = null;
    this.startDate = null;
    this.onClear.next(true);
    this.searchTerm = '';
  }

  open(content: Project) {
    this.selectedProject = content;
    const modal = this.modalService.open(EditModalComponent, {size: 'lg'});
    modal.componentInstance.projectData = content;
    modal.result.then((result) => {
    }, (reason) => {
      this.getDismissReason(reason)
    });
  }

  // set default values for new project
  openCreate(): void {
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
    }, (reason) => {
      this.getDismissReason(reason)
    });
  }

  // call CRUD service based on response edit logic
  private getDismissReason(reason: any): void {
    if (reason == 'Delete') {
      if (this.selectedProject !== null) {
        this.data = this.dataService.deleteProject(this.selectedProject);
      }
    } else if (reason == 'Cancel' || reason == 'Cross click' || reason == 0) {
      this.selectedProject = null;
    } else if (reason && reason.created) {
      if (this.selectedProject !== null) {
        this.data = this.dataService.updateProject(this.selectedProject, reason);
      }
    }
    else if (!reason.created || (reason.created && !reason.created.length)) {
      this.data = this.dataService.createProject(reason);
    }
    this.selectedProject = null;
  }

  // format and download comma delimited project data
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
