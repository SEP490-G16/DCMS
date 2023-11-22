import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CognitoService } from 'src/app/Module/Common/Cognito/Service/cognito.service';
import { PatientService } from '../../../Service/patient.service';

@Component({
  selector: 'app-patient-profile-tab',
  templateUrl: './patient-profile-tab.component.html',
  styleUrls: ['./patient-profile-tab.component.css']
})
export class PatientProfileTabComponent implements OnInit {

  constructor(private patientService: PatientService,
    private route: ActivatedRoute,
    private cognitoService: CognitoService,
    private router: Router,
    private toastr: ToastrService) { }
  patient: any;
  Patient_Id: any;
  patientBody: any = {
    patient_id: '',
    created_date: '',
    patient_name: '',
    gender: 0,
    phone_number: '',
    email: '',
    address: '',
    dental_medical_history: '',
    description: ''

  }
  validatePatient = {
    name: '',
    gender: '',
    phone: '',
    address: '',
    dob: '',
    email: '',
    createDate: ''
  }
  isSubmitted: boolean = false;
  isEditing: boolean = false;



  ngOnInit(): void {
    this.Patient_Id = this.route.snapshot.params['id'];
    this.getPatient(this.Patient_Id);
  }

  navigateHref(href: string) {
    const userGroupsString = sessionStorage.getItem('userGroups');

    if (userGroupsString) {
      const userGroups = JSON.parse(userGroupsString) as string[];

      if (userGroups.includes('dev-dcms-doctor')) {
        this.router.navigate([href + this.Patient_Id]);
      } else if (userGroups.includes('dev-dcms-nurse')) {
        this.router.navigate([href + this.Patient_Id]);
      } else if (userGroups.includes('dev-dcms-receptionist')) {
        this.router.navigate([href + this.Patient_Id]);
      } else if (userGroups.includes('dev-dcms-admin')) {
        this.router.navigate([href + this.Patient_Id]);
      }
    } else {
      console.error('Không có thông tin về nhóm người dùng.');
      this.router.navigate(['/default-route']);
    }
  }

  imageURL: string | ArrayBuffer = '';

  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }



  setPatientId() {
    this.router.navigate(['/benhnhan/danhsach/tab/lichtrinhdieutri', this.Patient_Id])
  }

  clickCount: number = 0;
  toggleEditing() {
    this.clickCount++;
    if (this.clickCount % 2 !== 0) {
      console.log(this.isEditing)
      this.isEditing = true;
      this.resetValidate();
      if (!this.patient.patient_name) {
        this.validatePatient.name = "Vui lòng nhập tên bệnh nhân!";
        this.isSubmitted = true;
      }
      if (!this.patient.created_date) {
        this.validatePatient.createDate = "Vui lòng nhập ngày tạo hồ sơ!";
        this.isSubmitted = true;
      }
      if (this.patient.email && !this.isValidEmail(this.patient.email)) {
        this.validatePatient.email = "Email không hợp lệ!";
        this.isSubmitted = true;
      }
      if (!this.patient.gender) {
        this.validatePatient.gender = "Vui lòng chọn giới tính!";
        this.isSubmitted = true;
      }
      if (!this.patient.phone_number) {
        this.validatePatient.phone = "Vui lòng nhập số điện thoại!";
        this.isSubmitted = true;
      }
      else if (!this.isVietnamesePhoneNumber(this.patient.phone_number)) {
        this.validatePatient.phone = "Số điện thoại không hợp lệ!";
        this.isSubmitted = true;
      }
      if (!this.patient.address) {
        this.validatePatient.address = "Vui lòng nhập địa chỉ!";
        this.isSubmitted = true;
      }
      if (this.isSubmitted) {
        return;
      }
    } else {
      this.patientBody = {
        patient_id: this.patient.patient_id,
        created_date: this.patient.created_date,
        patient_name: this.patient.patient_name,
        gender: this.patient.gender,
        phone_number: this.patient.phone_number,
        email: this.patient.email,
        address: this.patient.address,
        dental_medical_history: this.patient.dental_medical_history,
        description: this.patient.description
      }
      this.isEditing = false;
      this.patientService.updatePatient(this.patientBody, this.Patient_Id).subscribe(data => {
        this.toastr.success("", 'Cập nhật bệnh nhân thành công !');
      }, (error) => {
        this.toastr.error(error.error.message, 'Cập nhật bệnh nhân thất bại!')
      })
    }

  }
  getPatient(id: string) {
    this.patientService.getPatientById(id).subscribe(data => {
      this.patient = data;
      console.log(data);
    })
  }
  private resetValidate() {
    this.validatePatient = {
      name: '',
      gender: '',
      phone: '',
      address: '',
      dob: '',
      email: '',
      createDate: ''
    }
    this.isSubmitted = false;
  }
  private isVietnamesePhoneNumber(number: string): boolean {
    return /^(\+84|84|0)?[1-9]\d{8}$/
      .test(number);
  }
  private isValidEmail(email: string): boolean {
    // Thực hiện kiểm tra địa chỉ email ở đây, có thể sử dụng biểu thức chính quy
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }
}
