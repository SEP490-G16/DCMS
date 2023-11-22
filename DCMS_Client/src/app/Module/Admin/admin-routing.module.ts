import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FacilityComponent } from "./Component/facility/facility.component";
import { LaboComponent } from "./Component/labo/labo.component";
import { MaterialComponent } from "./Component/material/material.component";
import { MedicineComponent } from "./Component/medicine/medicine.component";
import { ServiceComponent } from "./Component/service/service.component";
import { SpecimensComponent } from "./Component/specimens/specimens.component";
import { StaffComponent } from "./Component/staff/staff.component";
import { StaffDetailComponent } from "./Component/staff-detail/staff-detail.component";
import { PendingSpecimensComponent } from "./Component/pending-specimens/pending-specimens.component";
import {
  WarehouseImportMaterialManagementComponent
} from "./Component/warehouse-import-material-management/warehouse-import-material-management.component";
import {
  WarehouseExportMaterialManagementComponent
} from "./Component/warehouse-export-material-management/warehouse-export-material-management.component";
import { FollowingTimekeepingComponent } from "./Component/following-timekeeping/following-timekeeping.component";


const adminRoutes: Routes = [
  { path: '', redirectTo: 'co-so', pathMatch: 'full' },
  { path: 'co-so', component: FacilityComponent },
  { path: 'labo', component: LaboComponent },
  {
    path: '', children: [
      { path: 'vat-lieu', component: MaterialComponent },
      { path: 'quan-ly-nhap', component: WarehouseImportMaterialManagementComponent },
      { path: 'quan-ly-xuat', component: WarehouseExportMaterialManagementComponent }
    ]
  },
  { path: 'thuoc', component: MedicineComponent },
  { path: 'thu-thuat', component: ServiceComponent },
  {
    path: '', children: [
      { path: 'mau', component: SpecimensComponent },
      { path: 'mau-dang-cho', component: PendingSpecimensComponent }
    ]
  },
  {
    path: 'nhan-vien', children: [
      { path: '', component: StaffComponent },
      { path: 'chi-tiet-nhan-vien', component: StaffDetailComponent }
    ]
  },
  { path: 'letan/theo-doi-cham-cong', component: FollowingTimekeepingComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
