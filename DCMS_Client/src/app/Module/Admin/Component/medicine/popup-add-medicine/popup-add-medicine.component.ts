import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-add-medicine',
  templateUrl: './popup-add-medicine.component.html',
  styleUrls: ['./popup-add-medicine.component.css']
})
export class PopupAddMedicineComponent implements OnInit {

  medicine={
    name:'',
    toUse:'',
    contraindicated:'',
    description:''
  }
  constructor() { }
  validateMedicine ={
    name:'',
    toUse:'',
  }
  isSubmitted:boolean = false;
  ngOnInit(): void {
  }
  addMedicine(){
    this.resetValidate();
    if (!this.medicine.name){
      this.validateMedicine.name = "Vui lòng nhập tên thuốc!";
      this.isSubmitted = true;
    }
    if (!this.medicine.toUse){
      this.validateMedicine.toUse = "Vui lòng nhập cách sử dụng!";
      this.isSubmitted = true;
    }
    if (this.isSubmitted){
      return;
    }
  }

  private resetValidate(){
    this.validateMedicine ={
      name:'',
      toUse:'',
    }
    this.isSubmitted = false;
  }
}
