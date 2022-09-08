import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { StatusMessage } from 'src/app/constants/Messages';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';

@Component({
  selector: 'app-fci-hired-from',
  templateUrl: './fci-hired-from.component.html',
  styleUrls: ['./fci-hired-from.component.css']
})
export class FciHiredFromComponent implements OnInit {

  hiredfromId: any;
  hiredfromName: any;
  canShowMenu: boolean;
  loading: boolean;
  FilteredArray: any;
  fcihiredfromCols: any;
  fcihiredfromData: any;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {    
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.onView();
  }

  onCheck() {
    this.fcihiredfromData.forEach(i => {
      if((i.hired_from_id * 1) === (this.hiredfromId * 1)) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: 'Hire From ID is already Exist,Please Update'
        });
        this.hiredfromId = null;
      }
    })
}

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.FciHiredFrom_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.fcihiredfromCols = this.tableconstants.FciHiredFrom;
        this.fcihiredfromData = res;
        this.FilteredArray = res;
        this.loading = false;
      } else {
        this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: StatusMessage.NoRecForCombination
        });
      }
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

  onSave() {
    const params = {
    'hired_from_id': this.hiredfromId,
    'hired_from_Name': this.hiredfromName,
  };
  this.restAPIService.post(PathConstants.FciHiredFrom_POST, params).subscribe(res => {
    if (res) {
      this.onClear();
      this.onView();
      this.messageService.clear();
      this.messageService.add({
        key: 't-err', severity: StatusMessage.SEVERITY_SUCCESS,
        summary: StatusMessage.SUMMARY_SUCCESS, detail: StatusMessage.SuccessMessage
      });
    } else {
      this.loading = false;
      this.messageService.clear();
      this.messageService.add({
        key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
        summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ErrorMessage
      });
    }
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
    this.fcihiredfromData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.fcihiredfromData = this.FilteredArray.filter(item => {
        return item.hired_from_Name.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.fcihiredfromData = this.FilteredArray;
    }
  }

  onRow(event, selectedRow) {
    this.hiredfromId = selectedRow.hired_from_id;
    this.hiredfromName  = selectedRow.hired_from_Name;
  }

  onClear() {
    this.hiredfromId  = null;
    this.hiredfromName  = null;
  }

}
