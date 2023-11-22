import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbModalModule, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { PatientRecordsComponent } from './Component/patient-records/patient-records.component';
import { PatientRoutingModule } from './patient-routing.module';

import { PatientProfileTabComponent } from './Component/patient-records/patient-profile-tab/patient-profile-tab.component';
import { PatientAppointmentTabComponent } from './Component/patient-records/patient-appointment-tab/patient-appointment-tab.component';
import { PatientPaymentTabComponent } from './Component/patient-records/patient-payment-tab/patient-payment-tab.component';
import { PatientSpecimensTabComponent } from './Component/patient-records/patient-specimens-tab/patient-specimens.component';

import { PatientLichtrinhdieutriComponent } from './Component/patient-records/patient-lichtrinhdieutri/patient-lichtrinhdieutri.component';
import { PopupPaymentComponent } from './Component/patient-records/patient-payment-tab/pop-up-payment/popup-payment.component'

import { PopupAddPatientComponent } from './Component/patient-records/popup-add-patient/popup-add-patient.component';
import { AddExaminationComponent } from './Component/patient-records/patient-lichtrinhdieutri/Add-Examination/popup-add-examination.component';
import { PopupAddTreatmentcourseComponent } from './Component/patient-records/patient-lichtrinhdieutri/popup-add-treatmentcourse/popup-add-treatmentcourse.component';
import { PopupEditTreatmentcourseComponent } from './Component/patient-records/patient-lichtrinhdieutri/popup-edit-treatmentcourse/popup-edit-treatmentcourse.component';
import { EditDetailExaminationComponent } from './Component/patient-records/patient-lichtrinhdieutri/Edit-examination/popup-edit-examination.component';
import { PopupDeletePatientComponent } from './Component/patient-records/popup-delete-patient/popup-delete-patient.component';

import { VNDateTimeFormatPipe } from 'src/app/Utils/Pipe/datetimeformat.pipe';

import { AdminModule } from '../Admin/admin.module';
import { SharedModule } from '../Common/Shared.module';
@NgModule({
  declarations: [
    PatientRecordsComponent,
    PatientProfileTabComponent,
    PatientPaymentTabComponent,
    PopupPaymentComponent,
    PatientSpecimensTabComponent,
    PatientAppointmentTabComponent,
    PopupAddPatientComponent,
    PopupDeletePatientComponent,
    PatientLichtrinhdieutriComponent,
    PopupAddTreatmentcourseComponent,
    PopupEditTreatmentcourseComponent,
    AddExaminationComponent,
    EditDetailExaminationComponent,
    VNDateTimeFormatPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PatientRoutingModule,
    HttpClientModule,
    AdminModule,
    SharedModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
    NgbModule,
  ],
  exports: [
    PopupAddPatientComponent,
    VNDateTimeFormatPipe
  ],

  providers: [DatePipe]
})
export class PatientModule { }
