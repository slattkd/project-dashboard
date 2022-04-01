import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Project } from '../models/project';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() projectData: Project;
  @Input() allProjectData: Project[] | undefined;
  @Output() onProjectUpdate = new EventEmitter<Project>();
  @Output() onValidUpdate = new EventEmitter<boolean>();

  projectForm = new FormGroup({
    // could use custom validator for duplicate titles
    title: new FormControl(''),
    project_owner: new FormControl('', Validators.required),
    division: new FormControl('', Validators.required),
    budget: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{1,5}[\.][0-9]{2}$")]),
    status: new FormControl('', Validators.required),
    created: new FormControl('', Validators.required),
    modified: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
    if (this.projectData) {
      const { title, project_owner, division, budget, status, created, modified } = this.projectData;
      this.projectForm.patchValue({title, project_owner, division, budget, status, created, modified});
      this.projectForm.controls['created'].disable();
      this.projectForm.controls['modified'].disable();
    }

    if (this.projectData.status === 'archived') {
      this.projectForm.disable();
    }

    this.projectForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((value: any) => {
      let formValues = this.projectForm.getRawValue();
      this.projectUpdate(formValues);
    });
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.log('submit', this.projectForm.value);
  }

  public projectUpdate(proj: Project): void {
    this.onProjectUpdate.emit(proj);
    this.onValidUpdate.emit(this.projectForm.valid);
  }

  // testing duplicate title validator function
  // public duplicateValidator(): boolean {
  //   if (this.allProjectData) {
  //     return !this.allProjectData.some(proj => proj.title === this.projectForm.value?.title);
  //   } else {
  //     return false;
  //   }
  // }

} 
