import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { MessageService } from 'primeng/api';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weighment-master',
  templateUrl: './weighment-master.component.html',
  styleUrls: ['./weighment-master.component.css']
})
export class WeighmentMasterComponent implements OnInit {
  WeighmentMasterData: any;
  WeighmentMasterCols: any;
  FilteredArray: any = [];
  WeighmentData: any;
  WeighmentCode: any;
  WeighmentType: any;
  Active: any;
  DeleteFlag: any;
  Weighment: any;
  RCode: any;
  searchText: any;
  GCode: any;
  canShowMenu: boolean;
  loading: boolean;
  NewCode: any;
  isAdd: boolean = false;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
    this.loading = true;
    this.restAPIService.get(PathConstants.WEIGHMENT_MASTER).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.WeighmentMasterCols = this.tableConstants.WeighmentMaster;
        this.WeighmentMasterData = res;
        this.FilteredArray = res;
        this.NewCode = res.length + 1;
        let sno = 0;
        this.WeighmentMasterData.forEach(ss => {
          sno += 1;
          ss.SlNo = sno;
        });
        this.loading = false;
      }
      else {
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
    this.onClear();
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.Weighment = selectedRow.WECode;
    this.WeighmentCode = selectedRow.WECode;
    this.WeighmentType = selectedRow.WEType;
    this.Active = selectedRow.Activeflag;
    this.DeleteFlag = selectedRow.DeleteFlag;
  }

  onAdd() {
    this.isAdd = true;
    this.isEdited = false;
    this.WeighmentCode = this.NewCode;
    this.WeighmentType = this.Weighment = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'Type': (this.Weighment === undefined) ? 'A' : '',
      'WECode': this.Weighment || '',
      'WEType': this.WeighmentType,
      'DeleteFlag': this.DeleteFlag || 'F',
      'Activeflag': this.Active,
    };
    this.restAPIService.post(PathConstants.WEIGHMENT_MASTER_POST, params).subscribe(res => {
      if (res) {
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
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: StatusMessage.ValidCredentialsErrorMessage
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
    this.onClear();
  }

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.WEIGHMENT_MASTER).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.WeighmentMasterCols = this.tableConstants.WeighmentMaster;
        this.WeighmentMasterData = res;
        this.FilteredArray = res;
        this.NewCode = res.length + 1;
        let sno = 0;
        this.WeighmentMasterData.forEach(ss => {
          sno += 1;
          ss.SlNo = sno;
        });
        this.loading = false;
      }
      else {
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
    this.onClear();
  }

  onSearch(value) {
    this.WeighmentMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.WeighmentMasterData = this.FilteredArray.filter(item => {
        return item.WEType.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.WeighmentMasterData = this.FilteredArray;
    }
  }

  onClear() {
    this.WeighmentMasterData = this.WeighmentMasterCols = undefined;
    this.WeighmentCode = this.WeighmentType = this.Weighment = this.NewCode = this.Active = undefined;
    this.isEdited = false;
  }
}