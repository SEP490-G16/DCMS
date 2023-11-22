import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TreatmentCourseDetailService } from 'src/app/Module/Patient/Service/TreatmentCourseDetail/treatmentcoureDetail.service';
import { MaterialUsageService } from 'src/app/Module/Admin/Service/MaterialUsage/MaterialUsageService.component';
import { Examination } from '../../../../../../../../../../DCMS_Client/DCMS_Client/src/app/model/ITreatmentCourseDetail';
import { ITreatmentCourse } from '../../../../../../../../../../DCMS_Client/DCMS_Client/src/app/model/ITreatment-Course';

@Component({
  selector: 'app-popup-edit-examination',
  templateUrl: './popup-edit-examination.component.html',
  styleUrls: ['../Add-Examination/popup-add-examination.component.css'],
  animations: [
    trigger('rowAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ])
    ]),
  ]
})
export class EditDetailExaminationComponent implements OnInit {

  //Pathparam
  patient_Id: string = "";
  treatmentCourse_Id: string = "";
  examinationId: string = "";
  //Image
  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef;
  imageURL: string | ArrayBuffer = '';
  imageUrls: string[] = [];
  showPopup = false;
  showInput = false;

  //Thủ thuật
  Body_Medical_Procedure = {
    medical_procedure_group_id: '',
    name: '',
    price: '',
    description: ''
  }
  //Đặt xưởng vật tư
  Body_Medical_Supply = {
    type: "",
    name: "",
    quantity: 0,
    unit_price: 0,
    order_date: 0,
    orderer: "",
    received_date: 0,
    receiver: "",
    warranty: 0,
    description: "",
    facility_id: "",
    labo_id: null,
    used_date: "",
    patient_id: "",
    status: "",
  }
  //Vật liệu sử dụng
  Body_Material_Usage: material_usage_body[] = [];

  //Data Table
  tableRows: any[] = [
    { tooth: '', condition: '', procedure_name: '', khdongy: '', unit_price: '', total: '', total_paid: '', remain: '', status: '' }
  ];

  supplyOrderRows: any[] = [
    { type: '', supplyName: '', quantity: '', unit_price: '', total: '', discount: '', order_date: '', order: '', status: '' }
  ]
  materialUsageRows: any[] = [
    { material_name: '', quantity: 0, usage_date: '', adder: '' }
  ]

  examination: Examination = {} as Examination;
  treatmentCourse: ITreatmentCourse = [];
  staff_id: string = "";
  doctors = [
    {
      doctorid: "ad2879dd-626c-4ade-8c95-da187af572ad",
      doctorName: "Thế"
    }
  ]
  facility: string = "";

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private materialUsageService: MaterialUsageService,
    private eRef: ElementRef
  ) {
    this.examination = {
      treatment_course_id: "",
      diagnosis: "",
      xRayImage: "",
      created_date: "",
      facility_id: "",
      description: "",
      staff_id: "",
      xRayImageDes: "",
      medicine: ""

    } as Examination;

    this.examination.created_date = new Date().toISOString().substring(0, 10);

    const facility = sessionStorage.getItem("locale");
    if (facility) {
      this.facility = facility;
    }
  }

  ngOnInit(): void {
    //Set id from pathparm
    this.patient_Id = this.route.snapshot.params['id'];
    this.treatmentCourse_Id = this.route.snapshot.params['tcId'];
    this.examinationId = this.route.snapshot.params['examinationId'];
    console.log("Patient Id", this.patient_Id);
    console.log("Treatment Id", this.treatmentCourse_Id);
    console.log("Examination Id", this.examinationId);
  }

  //Xử lý với ảnh
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.showPopup && !this.containerRef.nativeElement.contains(event.target)) {
      this.showPopup = false;
    }
  }
  putExamination() {

  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      // Xử lý ảnh đầu tiên
      const reader = new FileReader();
      reader.onload = (e: any) => { this.imageURL = e.target.result; };
      reader.readAsDataURL(files[0]);

      // Xử lý các ảnh tiếp theo (nếu có)
      this.imageUrls = [];
      for (let i = 1; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.onload = (e: any) => { this.imageUrls.push(e.target.result); };
        fileReader.readAsDataURL(files[i]);
      }
    }
  }

  removeImage(urlToRemove: string) {
    this.imageUrls = this.imageUrls.filter(url => url !== urlToRemove);
  }

  //Xử lý với bảng
  addNewRow(status: number) {
    switch (status) {
      case 2:
        this.supplyOrderRows.push({ tooth: '', material: '', supply: '', amount: '', dongia: '', total: '', discount: '', order_date: '', order: '', status: '' });
        console.log("Table row", this.supplyOrderRows);
        this.supplyOrderRows[this.supplyOrderRows.length - 1].animationClass = 'new-row-animation';
        break;
      case 3:
        this.materialUsageRows.push({ material_name: '', amount: 0, usage_date: '', adder: '' });
        console.log("Table row", this.materialUsageRows);
        this.materialUsageRows[this.materialUsageRows.length - 1].animationClass = 'new-row-animation';
        break;
      default:
        this.tableRows.push({ tooth: '', condition: '', procedure_name: '', khdongy: '', dongia: '', thanhtien: '', datra: '', conlai: '', tinhtrang: '' });
        console.log("Table row", this.tableRows);
        this.tableRows[this.tableRows.length - 1].animationClass = 'new-row-animation';
        break;
    }
  }

  removeRow(index: number, status: number) {
    switch (status) {
      case 2:
        this.supplyOrderRows.splice(index, 1);
        break;
      case 3:
        this.materialUsageRows.splice(index, 1);
        break;
      default:
        this.tableRows.splice(index, 1);
        break;
    }
  }

  isHovering: boolean = false;
  animateIcon(event: Event) {
    const target = event.target as HTMLElement;
    target.style.animation = 'clickAnimation 0.5s';
    target.addEventListener('animationend', () => {
      target.style.animation = '';
    });
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

interface material_usage_body {
  material_warehouse_id: string,
  treatment_course_id: string,
  examination_id: string,
  quantity: string,
  price: number,
  total_paid: number,
  description: string
}
