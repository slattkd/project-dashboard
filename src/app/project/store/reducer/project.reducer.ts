import {Action, createReducer, on} from '@ngrx/store';
import * as ProjectActions from '../../../project.actions';
import { Project } from '../../../models/project'; 
import projectData from '../../../mock-data.json';

export const projectFeatureKey = 'project';

export interface ProjectState {
  projects: Project[];
}

export const initialState: ProjectState = {
  projects: projectData
};

export const projectReducer = createReducer(
  initialState,
  on(ProjectActions.addProject,
    (state: ProjectState, {project}) =>
      ({...state, projects: [...state.projects, project]})
    )
);

export function reducer(state: ProjectState | undefined, action: Action): any {
  return projectReducer(state, action);
};