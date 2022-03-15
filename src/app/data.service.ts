import { Injectable } from '@angular/core';
import projectData from './mock-data.json';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: PROJECT[] = projectData;

  constructor() { }

  getProjects() : PROJECT[] {
    return this.sortData(this.data);
  }

  createProject(proj: PROJECT): PROJECT[] {
    proj.created = new Date().toLocaleDateString();
    this.data.unshift(proj);
    window.alert('project created');
    return this.sortData(this.data);
  }

  updateProject(oldProj: PROJECT, newProj: PROJECT): PROJECT[] {
    let index = this.data.findIndex((each: any) => each == oldProj);
    this.data.splice(index, 1);
    newProj.modified = new Date().toLocaleDateString();
    this.data.unshift(newProj);
    window.alert('project updated');
    return this.sortData(this.data);
  }

  deleteProject(deleteProj: PROJECT): PROJECT[] {
    let index = this.data.findIndex((each: any) => each.title == deleteProj.title && each.created == deleteProj.created);
    this.data.splice(index, 1);
    window.alert('project deleted');
    return this.sortData(this.data);
  }

  sortData(projects: PROJECT[]): PROJECT[] {
    return projects.sort((a: PROJECT, b: PROJECT) => a.title > b.title ? 1 : -1)
  }
}

export interface PROJECT {
  title: string,
  division?: string,
  project_owner?: string,
  budget: number,
  status?: string,
  created: string,
  modified?: string | null,
}