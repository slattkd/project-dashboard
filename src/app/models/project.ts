import projectData from '../mock-data.json';

export class Project {
  title: string;
  division: string;
  project_owner: string;
  budget: number;
  status: string;
  created: string;
  modified: string | null;
}
