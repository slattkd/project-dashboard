import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepicker, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { SharedModule } from './shared/shared.module';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchComponent,
    ProjectCardComponent,
    DatePickerComponent,
    EditModalComponent,
    ProjectDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
