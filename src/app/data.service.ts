import { Injectable } from '@angular/core';
import projectData from './mock-data.json';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: PROJECT[] = projectData;

  constructor() { }

  getProjects() : PROJECT[] {
    return this.data;
  }

  createProject(proj: PROJECT): PROJECT[] {
    this.data.push(proj);
    window.alert('project deleted');
    return this.data;
  }

  updateProject(oldProj: PROJECT, newProj: PROJECT): PROJECT[] {
    console.log('update', oldProj, newProj);
    // TODO: update and return
    let index = this.data.findIndex((each: any) => each.title == oldProj.title && each.created == oldProj.created);
    this.data.splice(index, 1);
    this.data.push(newProj);
    window.alert('project updated');
    return this.data;
  }

  deleteProject(deleteProj: PROJECT): PROJECT[] {
    console.log('delete', deleteProj);
    let index = this.data.findIndex((each: any) => each.title == deleteProj.title && each.created == deleteProj.created);
    this.data.splice(index, 1);
    window.alert('project deleted');
    return this.data;
  }
}

export interface PROJECT {
  title?: string,
  division?: string,
  project_owner?: string,
  budget: number,
  status?: string,
  created: string,
  modified?: string | null,
}