import { Component, OnInit, ViewChild } from '@angular/core';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-depositors',
  templateUrl: './depositors.component.html',
  styleUrls: ['./depositors.component.css']
})
export class DepositorsComponent implements OnInit {

  SuppliersData: any;
  data: any;
  column?: any;
  items: any;
  canShowMenu: boolean;
  filterArray: any;
  searchText: any;
  loading: boolean;
  @ViewChild('dt', { static: false }) table: any;

  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private tableConstants: TableConstants, private messageService: MessageService) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.column = this.tableConstants.SupplierData;
    this.loading = true;
    this.restApiService.get(PathConstants.DEPOSITOR).subscribe((response: any[]) => {
      if (response !== undefined && response !== null) {
        this.data = response;
        this.data = response.filter((value: { Tyname: any; }) => { return value.Tyname === "SUPPLIER" });
        this.SuppliersData = this.data;
        let sno = 0;
        this.SuppliersData.forEach(S => {
          sno += 1;
          S.SlNo = sno;
        });
        this.loading = false;
        this.filterArray = this.data;
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: StatusMessage.NoRecordMessage
        });
      }
      this.items = [
        {
          label: 'Excel', icon: 'fa fa-table', command: () => {
            this.table.exportCSV();
          }
          // },
          //  {
          //   label: 'PDF', icon: "fa fa-file-pdf-o", command: () => {
          //     this.exportAsPDF();
          //   }
        }];
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
          summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ErrorMessage
        });
      }
    });
  }

  onSearch(value) {
    this.SuppliersData = this.filterArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.SuppliersData = this.SuppliersData.filter(item => {
        return item.DepositorName.toString().startsWith(value);
      });
    }
  }

  // exportAsPDF() {
  //   var doc = new jsPDF('p', 'pt', 'a4');
  //   doc.text("Tamil Nadu Civil Supplies Corporation - Head Office", 100, 30);
  //   // var img ="assets\layout\images\dashboard\tncsc-logo.png";
  //   // doc.addImage(img, 'PNG', 150, 10, 40, 20);
  //   var col = this.column;
  //   var rows = [];
  //   this.data.forEach(element => {
  //     var temp = [element.SlNo, element.DepositorCode, element.DepositorName];
  //     rows.push(temp);
  //   });
  //   doc.autoTable(col, rows);
  //   doc.save('SUPPLIERS_DATA.pdf');
  // }

  print() {
    window.print();
  }
}
