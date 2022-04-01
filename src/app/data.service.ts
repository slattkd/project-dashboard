import { Injectable } from '@angular/core';
import projectData from './mock-data.json';
import { Project } from './models/project';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: Project[] = projectData;

  constructor() { }

  getProjects() : Project[] {
    return this.sortData(this.data);
  }

  createProject(proj: Project): Project[] {
    proj.created = new Date().toLocaleDateString();
    this.data.unshift(proj);
    window.alert('project created');
    return this.sortData(this.data);
  }

  updateProject(oldProj: Project, newProj: Project): Project[] {
    let index = this.data.findIndex((each: any) => each == oldProj);
    this.data.splice(index, 1);
    newProj.modified = new Date().toLocaleDateString();
    this.data.unshift(newProj);
    window.alert('project updated');
    return this.sortData(this.data);
  }

  deleteProject(deleteProj: Project): Project[] {
    let index = this.data.findIndex((each: any) => each.title == deleteProj.title && each.created == deleteProj.created);
    this.data.splice(index, 1);
    window.alert('project deleted');
    return this.sortData(this.data);
  }

  sortData(projects: Project[]): Project[] {
    return projects.sort((a: Project, b: Project) => a.title > b.title ? 1 : -1)
  }
}

// export interface Project {
//   title: string,
//   division?: string,
//   project_owner?: string,
//   budget: number,
//   status?: string,
//   created: string,
//   modified?: string | null,
// }