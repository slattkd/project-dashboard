import { createAction, props } from '@ngrx/store';
import { Project } from './models/project';

export const initProjects = createAction(
  '[Project] Init Projects',
  (projects: Project[]) => ({projects})
)

export const addProject = createAction(
  '[Project] Add Project',
  (project: Project) => ({project})
)