import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CognitoService } from 'src/app/Module/Common/Cognito/Service/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentCourseService {
  private apiUrl = 'https://ltmup12v3i.execute-api.ap-southeast-1.amazonaws.com/dev';

  constructor(private http: HttpClient, private cognitoService:CognitoService) { }

  getTreatmentCourse(id:string):Observable<any> {
    let idToken = sessionStorage.getItem("id_Token");
    const headers = new HttpHeaders({
      'Authorization': `${idToken}`,
      'Accept':'application/json'
    });

    return this.http.get(`${this.apiUrl}/treatment-course/patient-id/${id}`, { headers });
  }

  postTreatmentCourse(PostTreatmentCourse:any): Observable<any> {
    let idToken = sessionStorage.getItem("id_Token");
    const headers = new HttpHeaders({
      'Authorization': `${idToken}`,
      "Content-Type": "application/json; charset=utf8"
    });
    const requestBody = JSON.stringify(PostTreatmentCourse);
    return this.http.post(`${this.apiUrl}/treatment-course`, requestBody, { headers });
  }

  putTreatmentCourse(id:string, PutTreatmentCourse:any): Observable<any> {
    let idToken = sessionStorage.getItem("id_Token");
    const headers = new HttpHeaders({
      'Authorization': `${idToken}`,
      "Content-Type": "application/json; charset=utf8"
    });
    const requestBody = JSON.stringify(PutTreatmentCourse);
    return this.http.put(`${this.apiUrl}/treatment-course/${id}`, requestBody, { headers });
  }

  deleteTreatmentCourse(id:string):Observable<any> {
    let idToken = sessionStorage.getItem("id_Token");

    const headers = new HttpHeaders({
      'Authorization': `${idToken}`
    });
      return this.http.delete(`${this.apiUrl}/treatment-course/${id}`, { headers });
  }

}
