import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LoginComponent } from './Module/Common/Cognito/Component/Login/login.component';
import { ChangeAppointmentComponent } from './Module/Patient/Component/change-appointment/change-appointment.component';
import { FormsModule } from '@angular/forms';
import { RegisterWorkScheduleComponent } from './Module/Common/Register-work-schedule/Component/register-work-schedule.component';
import { PatientZaloModule } from './Module/Patient/PatientZalo.module';
import { SharedModule } from './Module/Common/Shared.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterWorkScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModalModule,
    SharedModule,
    PatientZaloModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
