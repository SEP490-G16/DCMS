import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReceptionistAppointmentListComponent } from './Component/receptionist-appointment-list/receptionist-appointment-list.component';
import { ReceptionistTimekeepingComponent } from './Component/receptionist-timekeeping/receptionist-timekeeping.component';
import { ReceptionistWaitingRoomComponent } from './Component/receptionist-waiting-room/receptionist-waiting-room.component';
import { ReceptionistComponent } from './Component/receptionist.component';

import { ReceptionistRoutingModule } from './receptionist-routing.module';

import { PatientModule } from '../Patient/Patient.module';

import { AddWaitingRoomComponent } from './Component/receptionist-waiting-room/add-waiting-room/add-waiting-room.component';
import { SharedModule } from '../Common/Shared.module';
import { PopupAddAppointmentComponent } from './Component/receptionist-appointment-list/popup-add-appointment/popup-add-appointment.component';
import { PopupEditAppointmentComponent } from './Component/receptionist-appointment-list/popup-edit-appointment/popup-edit-appointment.component';

@NgModule({
  declarations: [
   ReceptionistAppointmentListComponent,
   ReceptionistTimekeepingComponent,
   ReceptionistWaitingRoomComponent,
   ReceptionistComponent,
   PopupAddAppointmentComponent,
   PopupEditAppointmentComponent,
   AddWaitingRoomComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PatientModule,
    SharedModule,
    ReceptionistRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
  ]
})
export class ReceptionistModule{

}
