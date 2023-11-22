import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './Component/admin.component';
import { FacilityComponent } from './Component/facility/facility.component';
import { LaboComponent } from './Component/labo/labo.component';
import { MaterialComponent } from './Component/material/material.component';
import { MedicineComponent } from './Component/medicine/medicine.component';
import { PendingMaterialComponent } from './Component/pending-material/pending-material.component';
import { PendingSpecimensComponent } from './Component/pending-specimens/pending-specimens.component';
import { ServiceComponent } from './Component/service/service.component';
import { SpecimensComponent } from './Component/specimens/specimens.component';
import { StaffComponent } from './Component/staff/staff.component';
import { StaffDetailComponent } from './Component/staff-detail/staff-detail.component';
import { WarehouseExportMaterialManagementComponent } from './Component/warehouse-export-material-management/warehouse-export-material-management.component';
import { WarehouseImportMaterialManagementComponent } from './Component/warehouse-import-material-management/warehouse-import-material-management.component';
import { PopupAddBillExportMaterialComponent } from './Component/warehouse-export-material-management/popup-add-bill-export-material/popup-add-bill-export-material.component';
import { PopupDeleteBillExportMaterialComponent } from './Component/warehouse-export-material-management/popup-delete-bill-export-material/popup-delete-bill-export-material.component';
import { PopupDetailBillExportMaterialComponent } from './Component/warehouse-export-material-management/popup-detail-bill-export-material/popup-detail-bill-export-material.component';
import { PopupDeleteMedicineComponent } from './Component/medicine/popup-delete-medicine/popup-delete-medicine.component';
import { PopupAddMedicineComponent } from './Component/medicine/popup-add-medicine/popup-add-medicine.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { PopupEditMedicineComponent } from './Component/medicine/popup-edit-medicine/popup-edit-medicine.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgSelectModule } from "@ng-select/ng-select";
import { FollowingTimekeepingComponent } from './Component/following-timekeeping/following-timekeeping.component';
import { PopupAddStaffComponent } from './Component/staff/popup-add-staff/popup-add-staff.component';
import { PopupDeleteStaffComponent } from './Component/staff/popup-delete-staff/popup-delete-staff.component';
import { PopupAddSpecimensComponent } from './Component/specimens/popup-add-specimens/popup-add-specimens.component';
import { PopupDeleteSpecimensComponent } from './Component/specimens/popup-delete-specimens/popup-delete-specimens.component';
import { PopupAddServiceComponent } from './Component/service/popup-add-service/popup-add-service.component';
import { PopupDeleteServiceComponent } from './Component/service/popup-delete-service/popup-delete-service.component';
import { PopupAddGroupServiceComponent } from './Component/service/popup-add-group-service/popup-add-group-service.component';
import { PopupDeleteGroupServiceComponent } from './Component/service/popup-delete-group-service/popup-delete-group-service.component';
import { PopupAddMaterialComponent } from './Component/material/popup-add-material/popup-add-material.component';
import { PopupDeleteMaterialComponent } from './Component/material/popup-delete-material/popup-delete-material.component';
import { PopupAddLaboComponent } from './Component/labo/popup-add-labo/popup-add-labo.component';
import { PopupEditLaboComponent } from './Component/labo/popup-edit-labo/popup-edit-labo.component';
import { PopupDeleteLaboComponent } from './Component/labo/popup-delete-labo/popup-delete-labo.component';
import { PopupAddBillImportMaterialComponent } from './Component/import-bill-material/popup-add-bill-import-material/popup-add-bill-import-material.component';
import { PopupAddFacilityComponent } from './Component/facility/popup-add-facility/popup-add-facility.component';
import { PopupAddApproveSpecimensComponent } from './Component/pending-specimens/popup-add-approve-specimens/popup-add-approve-specimens.component';
import { PopupDetailBillImportMaterialComponent } from './Component/import-bill-material/popup-detail-bill-import-material/popup-detail-bill-import-material.component';
import { PopupDeleteBillImportMaterialComponent } from './Component/import-bill-material/popup-delete-bill-import-material/popup-delete-bill-import-material.component';
import { PopupDeleteFacilityComponent } from './Component/facility/popup-delete-facility/popup-delete-facility.component';
import { PopupEditGroupServiceComponent } from './Component/service/popup-edit-group-service/popup-edit-group-service.component';
import { PopupEditSpecimensComponent } from './Component/specimens/popup-edit-specimens/popup-edit-specimens.component';
import { PopupEditServiceComponent } from './Component/service/popup-edit-service/popup-edit-service.component';
import { PopupEditApproveSpecimensComponent } from './Component/pending-specimens/popup-edit-approve-specimens/popup-edit-approve-specimens.component';
import { PopupEditFacilityComponent } from './Component/facility/popup-edit-facility/popup-edit-facility.component';
import { PopupEditStaffComponent } from './Component/staff/popup-edit-staff/popup-edit-staff.component';
import { PopupEditMaterialComponent } from './Component/material/popup-edit-material/popup-edit-material.component';
import { PopupEditBillImportMaterialComponent } from './Component/import-bill-material/popup-edit-bill-import-material/popup-edit-bill-import-material.component';
import { vnDateTimeFormatPipe } from 'src/app/Utils/Pipe/VNdateformat.pipe';
import { SharedModule } from '../Common/Shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    FacilityComponent,
    LaboComponent,
    MaterialComponent,
    MedicineComponent,
    PendingMaterialComponent,
    PendingSpecimensComponent,
    ServiceComponent,
    SpecimensComponent,
    StaffComponent,
    StaffDetailComponent,
    WarehouseExportMaterialManagementComponent,
    WarehouseImportMaterialManagementComponent,
    PopupAddStaffComponent,
    PopupDeleteStaffComponent,
    PopupAddSpecimensComponent,
    PopupDeleteSpecimensComponent,
    PopupAddServiceComponent,
    PopupDeleteServiceComponent,
    PopupAddGroupServiceComponent,
    PopupDeleteGroupServiceComponent,
    PopupDeleteMedicineComponent,
    PopupAddMedicineComponent,
    PopupAddMaterialComponent,
    PopupDeleteMaterialComponent,
    PopupAddLaboComponent,
    PopupEditLaboComponent,
    PopupDeleteLaboComponent,
    PopupAddBillExportMaterialComponent,
    PopupAddBillImportMaterialComponent,
    PopupAddFacilityComponent,
    PopupAddApproveSpecimensComponent,
    PopupDetailBillImportMaterialComponent,
    PopupDetailBillExportMaterialComponent,
    PopupDeleteBillExportMaterialComponent,
    PopupDeleteBillImportMaterialComponent,
    PopupDeleteFacilityComponent,
    PopupEditGroupServiceComponent,
    PopupEditSpecimensComponent,
    PopupEditServiceComponent,
    PopupEditApproveSpecimensComponent,
    PopupEditFacilityComponent,
    PopupEditStaffComponent,
    PopupEditMaterialComponent,
    PopupEditMedicineComponent,
    PopupEditBillImportMaterialComponent,
    FollowingTimekeepingComponent,
    vnDateTimeFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
    NgbModule,
    AdminRoutingModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgSelectModule,
  ],
  exports: [
    PopupAddApproveSpecimensComponent,
    PopupAddSpecimensComponent,
    PopupAddSpecimensComponent,
    PopupEditSpecimensComponent
  ],
  providers: [DatePipe]
})
export class AdminModule { }
