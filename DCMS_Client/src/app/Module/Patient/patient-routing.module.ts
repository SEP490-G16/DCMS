import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientRecordsComponent } from './Component/patient-records/patient-records.component';
import { PatientProfileTabComponent } from './Component/patient-records/patient-profile-tab/patient-profile-tab.component';
import { PatientAppointmentTabComponent } from './Component/patient-records/patient-appointment-tab/patient-appointment-tab.component';
import { PatientPaymentTabComponent } from './Component/patient-records/patient-payment-tab/patient-payment-tab.component';
import { PatientLichtrinhdieutriComponent } from './Component/patient-records/patient-lichtrinhdieutri/patient-lichtrinhdieutri.component';
import { AddExaminationComponent } from './Component/patient-records/patient-lichtrinhdieutri/Add-Examination/popup-add-examination.component';
import { EditDetailExaminationComponent } from './Component/patient-records/patient-lichtrinhdieutri/Edit-examination/popup-edit-examination.component';
import { PatientSpecimensTabComponent } from './Component/patient-records/patient-specimens-tab/patient-specimens.component';

const authRoutes: Routes = [
  {
    path: 'danhsach', children:[
      {
      path:'', component:PatientRecordsComponent,
      },
      {
        path: 'tab/lichtrinhdieutri/:id', children: [
          {path: '',  component:PatientLichtrinhdieutriComponent},
          {path: 'themlankham/:tcId', component:AddExaminationComponent},
          {path: 'sualankham/:tcId/:examinationId', component:EditDetailExaminationComponent}
        ]
      },
      {
        path: 'tab/lichhen/:id',
        component: PatientAppointmentTabComponent
      },
      {
        path: 'tab/mauvat/:id',
        component: PatientSpecimensTabComponent
      },
      {
        path: 'tab/thanhtoan/:id',
        component: PatientPaymentTabComponent
      },
      // {path:'tab/profile/:id', component:PatientProfileTabComponent}
      {path:'tab/hosobenhnhan/:id', component:PatientProfileTabComponent}

      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
