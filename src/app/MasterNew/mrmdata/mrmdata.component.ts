import { Component, OnInit, ViewChild } from '@angular/core';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { StatusMessage } from 'src/app/constants/Messages';
// import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-mrmdata',
  templateUrl: './mrmdata.component.html',
  styleUrls: ['./mrmdata.component.css']
})
export class MRMDataComponent implements OnInit {
  data: any;
  column?: any;
  items: any;
  canShowMenu: boolean;
  filterArray: any;
  searchText: any;
  loading: boolean;
  @ViewChild('dt', {static: false}) table: any;

  constructor(private restApiService: RestAPIService, private authService: AuthService,
    private tableConstants: TableConstants, private messageService: MessageService) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.column = this.tableConstants.MrmData;
    this.loading = true;
    this.restApiService.get(PathConstants.MRN).subscribe((response: any[]) => {
      if (response !== undefined && response !== null) {
        this.data = response;
        this.filterArray = response;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({ key: 't-err', severity: StatusMessage.SEVERITY_WARNING, summary: StatusMessage.SUMMARY_WARNING, detail: StatusMessage.NoRecForCombination });
      }
      this.items = [
        {
          label: 'Excel', icon: 'fa fa-table', command: () => {
            this.table.exportCSV();
          }
      //   },
      //   {
      //     label: 'PDF', icon: "fa fa-file-pdf-o", command: () => {
      //       this.exportAsPDF();
      //     }
        }]
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({ key: 't-err', severity: StatusMessage.SEVERITY_ERROR, summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ErrorMessage });
      }
    });
  }

  onSearch(value) {
    this.data = this.filterArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.data = this.data.filter(item => {
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
  //     var temp = [element.SlNo, element.DepositorName];
  //     rows.push(temp);
  //   });
  //   doc.autoTable(col, rows);
  //   doc.save('MRM_DATA.pdf');
  // }
  // print() {
  //   window.print();
  // }
}
