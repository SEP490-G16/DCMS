import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeAppointmentComponent } from './Component/change-appointment/change-appointment.component';
import { PatientZaloRoutingModule } from './patient-zalo-routing.module';

@NgModule({
  declarations: [
    ChangeAppointmentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    PatientZaloRoutingModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
    NgbModule,
  ],

  providers: [DatePipe]
})
export class PatientZaloModule { }
