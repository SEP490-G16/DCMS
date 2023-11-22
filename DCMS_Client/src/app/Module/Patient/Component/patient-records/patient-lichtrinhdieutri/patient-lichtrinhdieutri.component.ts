import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CognitoService } from 'src/app/Module/Common/Cognito/Service/cognito.service';
import { TreatmentCourseService } from '../../../Service/TreatmentCourseService/TreatmentCourse.service';
import { TreatmentCourseDetailService } from '../../../Service/TreatmentCourseDetail/treatmentcoureDetail.service';
import { TreatmentCourseDetail } from '../../../Model/ITreatmentCourseDetail';
@Component({
  selector: 'app-patient-lichtrinhdieutri',
  templateUrl: './patient-lichtrinhdieutri.component.html',
  styleUrls: ['./patient-lichtrinhdieutri.component.css']
})
export class PatientLichtrinhdieutriComponent implements OnInit {
  Patient_Id: string = "";
  examinations: any;
  ITreatmentCourse: any;

  constructor(
    private cognitoService: CognitoService, private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private treatmentCourseService: TreatmentCourseService,
    private TreatmentCourseDetailService: TreatmentCourseDetailService,
  ) { }

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

  ngOnInit(): void {
    this.Patient_Id = this.route.snapshot.params['id'];
    this.getTreatmentCourse();
  }


  getTreatmentCourse() {
    this.treatmentCourseService.getTreatmentCourse(this.Patient_Id)
      .subscribe((data) => {
        console.log("Treatment course: ", data);
        this.ITreatmentCourse = data;
        console.log("Data nhan", this.ITreatmentCourse)
        this.ITreatmentCourse.sort((a: any, b: any) => {
          const dateA = new Date(a.created_date).getTime();
          const dateB = new Date(b.created_date).getTime();
          return dateB - dateA;
        });
      }
      )
  }

  getExamination(courseId: string) {
    if (this.ITreatmentCourse.length > 0) {
      this.TreatmentCourseDetailService.getTreatmentCourseDetail(courseId)
        .subscribe(data => {
          console.log("Examination: ", data.data);
          this.examinations = data.data;
          console.log("Data nhan", this.examinations);
        })
    }
  }

  TreatmentCourse: any;
  editTreatmentCourse(course: any) {
    this.TreatmentCourse = course;
  }

  deleteTreatmentCourse(treatment_course_id: string) {
    console.log("course treatment id", treatment_course_id);
    const cf = confirm('Bạn có muốn xóa lộ trình này không?');
    if (cf) {
      this.treatmentCourseService.deleteTreatmentCourse(treatment_course_id)
        .subscribe((res) => {
          this.toastr.success(res.message, 'Xóa liệu trình thành công');
          window.location.reload();
        },
          (err) => {
            this.toastr.error(err.error.message, 'Xóa liệu trình thất bại');
          }
        )
    }
  }

  deleteExamination(examination_id: string) {
    const cf = confirm('Bạn có muốn xóa lần khám này không?');
    if (cf) {
      this.TreatmentCourseDetailService.deleteExamination(examination_id)
        .subscribe(() => {
          this.toastr.success('Xóa Lần khám thành công!');
          window.location.reload();
        },
          (err) => {
            this.toastr.error(err.error.message, "Xóa lần khám thất bại!");
          })
    }
  }

  TreatmentCourseDetail: any;
  navigateTreatmentCourse_Detail(examination: any) {
    const TreatmentCourseDetail: TreatmentCourseDetail = examination;
    this.TreatmentCourseDetail = TreatmentCourseDetail;
    this.router.navigate(['/benhnhan/danhsach/tab/lichtrinhdieutri/' + this.Patient_Id + '/chitiet/' + examination.examination_id]);
  }

  navigateAddExamination(tcId: string) {
    this.router.navigate(['/benhnhan/danhsach/tab/lichtrinhdieutri/' + this.Patient_Id + '/themlankham/' + tcId]);
  }

  navigateEditExamination(examination: any) {
    this.router.navigate(['/benhnhan/danhsach/tab/lichtrinhdieutri/' + this.Patient_Id + '/sualankham/' + examination.treatment_course_id + '/' + examination.examination_id]);
  }

}
