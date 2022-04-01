import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProject from '../reducer/project.reducer';

export const selectProjectState = createFeatureSelector<fromProject.ProjectState>(
  fromProject.projectFeatureKey
);

export const selectProjects = createSelector(
  selectProjectState, (state: fromProject.ProjectState) => state && state.hasOwnProperty('projects') ? state.projects : []
)