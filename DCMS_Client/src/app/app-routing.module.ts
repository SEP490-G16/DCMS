import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from "./Module/Common/Layouts/layouts.component";
import { ChatComponent } from './Module/Common/Chat/Component/chat.component';
import { AuthGuard } from './Module/Common/Cognito/Service/Guard/auth-guard.service';
import { RegisterWorkScheduleComponent } from './Module/Common/Register-work-schedule/Component/register-work-schedule.component';
import { ProfilePersonalComponent } from './Module/Common/Cognito/Component/Profile/profile-personal.component';
import { LoginComponent } from './Module/Common/Cognito/Component/Login/login.component';
const routes: Routes = [

  {
    path: 'dangnhap',
    component: LoginComponent
  },

  {
    path: '', component: LayoutsComponent,
    children: [
      {
        path: 'letan',
        loadChildren: () => import('./Module/Receptionist/receptionist.module').then(m => m.ReceptionistModule),
        // canActivate: [AuthGuard],
        // data: {
        //   allowedGroups: ['dev-dcms-receptionist']
        // }
      },
      {
        path: 'benhnhan',
        loadChildren: () => import('./Module/Patient/Patient.module').then(m => m.PatientModule),
        // canActivate: [AuthGuard],
        // data: {
        //   allowedGroups: ['dev-dcms-doctor', 'dev-dcms-nurse', 'dev-dcms-receptionist', 'dev-dcms-admin']
        // }
      },
      {
        path: "suahoso",
        component: ProfilePersonalComponent,
        data: {
          allowedGroups: ['dev-dcms-doctor', 'dev-dcms-nurse', 'dev-dcms-receptionist', 'dev-dcms-patient']
        }
      },
      {
        path: 'dangkylichlamviec',
        component: RegisterWorkScheduleComponent,
        // data: {
        //   allowedGroups: ['dev-dcms-doctor', 'dev-dcms-nurse', 'dev-dcms-receptionist']
        // }
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      // {
      //   path: 'xac-nhan-lich-hen',
      //   component: ConfirmAppointmentComponent
      // },
      {
        path: 'admin',
        loadChildren: () => import('./Module/Admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
        data: {
          allowedGroups: ['dev-dcms-admin']
        }
      },
    ]
  },

  {
    path: 'benhnhan-zalo',
    loadChildren: () => import('./Module/Patient/PatientZalo.module').then(m => m.PatientZaloModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
