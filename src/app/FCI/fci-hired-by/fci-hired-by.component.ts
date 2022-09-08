import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { StatusMessage } from 'src/app/constants/Messages';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';

@Component({
  selector: 'app-fci-hired-by',
  templateUrl: './fci-hired-by.component.html',
  styleUrls: ['./fci-hired-by.component.css']
})
export class FciHiredByComponent implements OnInit {

  hiredId: any;
  hiredName: any;
  canShowMenu: boolean;
  fcihiredbyCols: any;
  fcihiredbyData: any;
  loading: boolean;
  FilteredArray: any;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.onView();
  }

  onCheck() {
    this.fcihiredbyData.forEach(i => {
      if((i.hired_by_Id * 1) === (this.hiredId * 1)) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: 'Hire By ID is already Exist,Please Update'
        });
        this.hiredId = null;
      }
    })
}

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.FciHiredBy_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.fcihiredbyCols = this.tableconstants.FciHiredBy;
        this.fcihiredbyData = res;
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
    'hired_by_Id': this.hiredId,
    'hired_by_Name': this.hiredName,
  };
  this.restAPIService.post(PathConstants.FciHiredBy_POST, params).subscribe(res => {
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
    this.fcihiredbyData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.fcihiredbyData = this.FilteredArray.filter(item => {
        return item.hired_by_Name.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.fcihiredbyData = this.FilteredArray;
    }
  }

  onRow(event, selectedRow) {
    this.hiredId = selectedRow.hired_by_Id;
    this.hiredName  = selectedRow.hired_by_Name;
  }

  onClear() {
    this.hiredId  = null;
    this.hiredName  = null;
  }

}
