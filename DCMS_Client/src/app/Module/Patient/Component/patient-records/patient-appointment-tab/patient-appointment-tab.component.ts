import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment-timezone';
import 'moment/locale/vi';
import { RootObject } from 'src/app/Module/Receptionist/Model/IAppointment';
import { ReceptionistAppointmentService } from 'src/app/Module/Receptionist/Service/receptionist-appointment.service';
import { PatientService } from '../../../Service/patient.service';
import { CognitoService } from 'src/app/Module/Common/Cognito/Service/cognito.service';
import { ConvertJson } from 'src/app/Utils/Convert/ConvertJson';
@Component({
  selector: 'app-patient-appointment-tab',
  templateUrl: './patient-appointment-tab.component.html',
  styleUrls: ['./patient-appointment-tab.component.css']
})
export class PatientAppointmentTabComponent implements OnInit {
  Patient_Id: string = "";

  startDate: any;
  endDate: string = "2023-12-31";
  startDateTimestamp: number = 0;
  endDateTimestamp: number = 0;
  appointmentList: RootObject[] = [];
  currentDateTimestamp: number = 0;
  patientAppointments: any;

  constructor(
    private APPOINTMENT_SERVICE: ReceptionistAppointmentService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private cognitoService: CognitoService,
    private router: Router,
    private toastr: ToastrService) {

    const currentDateGMT7 = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
    this.currentDateTimestamp = this.dateToTimestamp2(currentDateGMT7);
    console.log("Hum nay: ", this.currentDateTimestamp);
    // Set date time hiện tại
    this.endDateTimestamp = this.dateToTimestamp(this.endDate);
  }
  ngOnInit(): void {
    this.Patient_Id = this.route.snapshot.params['id'];

    this.getAppointment();
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
  getAppointment() {
    this.APPOINTMENT_SERVICE.getAppointmentList(1696925134, this.endDateTimestamp).subscribe(data => {
      this.appointmentList = ConvertJson.processApiResponse(data);
      console.log("Appointment List: ", this.appointmentList);

      this.patientAppointments = this.appointmentList.filter(appointment =>
        appointment.appointments.some(app =>
          app.details.some(detail =>
            detail.patient_id === this.Patient_Id
          )
        )
      );
      this.patientAppointments.sort((a: any, b: any) => b.date - a.date);
    });
  }

  EditAppointmentPatient: any
  dateString: string = "";
  timeString: string = "";
  editAppointment(detail: any, dateTimestamp: any) {
    this.EditAppointmentPatient = detail;
    this.dateString = this.convertTimestampToDateString(dateTimestamp);
    console.log("DateString: ", this.dateString);
    this.timeString = this.timestampToGMT7String(detail.time);
    console.log("TimeString: ", this.timeString);
  }

  deleteAppointment(detail: any, dateTimestamp: any) {

  }

  //Convert Date
  dateToTimestamp(dateStr: string): number {
    const format = 'YYYY-MM-DD HH:mm:ss'; // Định dạng của chuỗi ngày
    const timeZone = 'Asia/Ho_Chi_Minh'; // Múi giờ
    const timestamp = moment.tz(dateStr, format, timeZone).valueOf();
    return timestamp;
  }
  dateToTimestamp2(dateStr: string): number {
    const format = 'YYYY-MM-DD HH:mm:ss'; // Định dạng của chuỗi ngày
    const timeZone = 'Asia/Ho_Chi_Minh'; // Múi giờ
    const timestamp = moment.tz(dateStr, format, timeZone).valueOf();
    return timestamp / 1000;
  }

  timestampToGMT7String(timestamp: number): string {
    // Kiểm tra xem timestamp có đơn vị giây hay mili giây
    const timestampInMilliseconds = timestamp * (timestamp > 1e12 ? 1 : 1000);

    // Chuyển timestamp thành chuỗi ngày và thời gian dựa trên múi giờ GMT+7
    const dateTimeString = moment.tz(timestampInMilliseconds, 'Asia/Ho_Chi_Minh').format('HH:mm');

    return dateTimeString;
  }

  convertTimestampToDateString(timestamp: number): string {
    return moment(timestamp).format('YYYY-MM-DD');
  }

  convertTimestampToVNDateString(timestamp: number): string {
    return moment(timestamp).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
  }

  timestampToGMT7StringWithDate(timestamp: number): string {
    const dateTimeString = moment.tz(timestamp * 1000, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm');
    return dateTimeString;
  }

}
