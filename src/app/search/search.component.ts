import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { PROJECT } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() projectData: PROJECT;
  @Output() onProjectUpdate = new EventEmitter<PROJECT>();

  projectForm = new FormGroup({
    title: new FormControl(''),
    project_owner: new FormControl('', Validators.required),
    division: new FormControl('', Validators.required),
    budget: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    created: new FormControl({value: '', disabled: true}, Validators.required),
    modified: new FormControl({value: '', disabled: true}, Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
    if (this.projectData) {
      const { title, project_owner, division, budget, status, created, modified } = this.projectData;
      this.projectForm.patchValue({
        title, project_owner, division, budget, status, created, modified
      });

    }

    this.projectForm.valueChanges.subscribe((value: any) => {
      this.projectUpdate(value);
    });
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.log(this.projectForm.value);
  }

  public projectUpdate(proj: PROJECT): void {
    this.onProjectUpdate.emit(proj);
}

}
