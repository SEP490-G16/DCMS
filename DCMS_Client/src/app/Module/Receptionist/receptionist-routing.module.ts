import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionistWaitingRoomComponent } from './Component/receptionist-waiting-room/receptionist-waiting-room.component';
import { ReceptionistTimekeepingComponent } from './Component/receptionist-timekeeping/receptionist-timekeeping.component';
import { ReceptionistAppointmentListComponent } from './Component/receptionist-appointment-list/receptionist-appointment-list.component';
import { ReceptionistComponent } from './Component/receptionist.component';
import { FollowingTimekeepingComponent } from '../Admin/Component/following-timekeeping/following-timekeeping.component';

const authRoutes: Routes = [
  { path: '', redirectTo: 'lich-hen', pathMatch: 'full' },

  {
    path: 'phong-cho',
    component: ReceptionistWaitingRoomComponent
  },

  {
    path: 'cham-cong',
    component: ReceptionistTimekeepingComponent
  },

  {
    path: 'lich-hen',
    component: ReceptionistAppointmentListComponent
  },
  { path: 'theo-doi-cham-cong', component: FollowingTimekeepingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class ReceptionistRoutingModule { }
