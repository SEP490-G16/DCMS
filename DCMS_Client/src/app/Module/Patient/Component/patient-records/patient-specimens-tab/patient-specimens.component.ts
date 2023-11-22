import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LaboService } from 'src/app/Module/Admin/Service/LaboService/Labo.service';
import { MedicalSupplyService } from 'src/app/Module/Admin/Service/MedicalSupplyService/medical-supply.service';
import { SpecimensService } from 'src/app/Module/Admin/Service/SpecimensService/SpecimensService.service';

@Component({
  selector: 'app-patient-specimens',
  templateUrl: './patient-specimens.component.html',
  styleUrls: ['./patient-specimens.component.css']
})
export class PatientSpecimensTabComponent implements OnInit {
  patient_Id: string = "";
  pagingSearch = {
    paging: 1,
    total: 0
  }
  PatientSpecimens: any[] = [];
  paging: any;
  count: number = 1;

  approveSpecimensList: any;

  labos: any;
  AllLabos: any;
  PutSpecimen: any;

  status: any;
  specimen: any;

  constructor(
    private SpecimensService: SpecimensService,
    private medicalSupplyService: MedicalSupplyService,
    private laboService: LaboService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.status = 1;
    this.paging = 1;
  }

  ngOnInit(): void {
    this.patient_Id = this.route.snapshot.params['id'];
    this.getAllSpecimens(this.pagingSearch.paging);
    this.getAllLabo();
    this.getApproveSpecimensList(this.status, this.paging);
  }

  getAllSpecimens(paging: number) {
    this.SpecimensService.getSpecimens(paging)
      .subscribe((res) => {
        console.log("Specimens Response: ", res);
        this.PatientSpecimens = res.data.filter((p: any) => p.p_patient_id === this.patient_Id);
        console.log("Specimens by Patient: ", this.PatientSpecimens);
      },
        (err) => {
          this.toastr.error(err.error.message, "Lấy dữ liệu Mẫu vật thất bại!");
        })
  }

  getAllLabo() {
    this.laboService.getLabos().subscribe((data) => {
      this.labos = data.data;
      console.log("Get all Labo: ", this.labos);
    })
  }

  getApproveSpecimensList(status: any, paging: any) {
    this.medicalSupplyService.getApproveSpecimensList(status, paging).subscribe(data => {
      this.approveSpecimensList = data.data;
      console.log(this.approveSpecimensList);
    })
  }

  pageChanged(event: number) {
    this.pagingSearch.paging = event;
    console.log(this.pagingSearch.paging)
    this.getAllSpecimens(this.pagingSearch.paging);
  }

  openEditSpecimen(specimens: any) {
    this.PutSpecimen = specimens;
    this.AllLabos = this.labos;
  }

  deleteSpecimens(id: string) {
    const cf = confirm("Bạn có muốn xóa mẫu vật này không?");
    if (cf) {
      this.SpecimensService.deleteSpecimens(id)
        .subscribe((res) => {
          this.toastr.success(res.message, 'Xóa mẫu vật thành công');
          window.location.reload();
        },
          (err) => {
            this.toastr.error(err.error.message, 'Xóa mẫu vật thất bại');
          }
        )
    }
  }

  navigateHref(href: string) {
    const userGroupsString = sessionStorage.getItem('userGroups');

    if (userGroupsString) {
      const userGroups = JSON.parse(userGroupsString) as string[];

      if (userGroups.includes('dev-dcms-doctor')) {
        this.router.navigate([href + this.patient_Id]);
      } else if (userGroups.includes('dev-dcms-nurse')) {
        this.router.navigate([href + this.patient_Id]);
      } else if (userGroups.includes('dev-dcms-receptionist')) {
        this.router.navigate([href + this.patient_Id]);
      } else if (userGroups.includes('dev-dcms-admin')) {
        this.router.navigate([href + this.patient_Id]);
      }
    } else {
      console.error('Không có thông tin về nhóm người dùng.');
      this.router.navigate(['/default-route']);
    }
  }

}
