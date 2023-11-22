import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-popup-add-bill-export-material',
  templateUrl: './popup-add-bill-export-material.component.html',
  styleUrls: ['./popup-add-bill-export-material.component.css']
})
export class PopupAddBillExportMaterialComponent implements OnInit {
  model!: NgbDateStruct;
  constructor() { }

  ngOnInit(): void {
  }
  isAdd: boolean = false;
  records: any[] = [];
  toggleAdd() {
    this.isAdd = !this.isAdd;
    if (this.isAdd) {
      this.records.push({
        nguoiXuat: null,
        tenVatLieu: null,
        donVi: null,
        soLuong: null,
        donGia: null,
        thanhTien: null,
        hanSudung: null,
        chietKhau: null

      });
    }

  }
  toggleCancel() {
    this.isAdd = false;
    if (this.records.length > 0) {
      this.records.pop();
    }
  }
  deleteRecord(index: number) {
    this.records.splice(index, 1);
  }
}
