import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { MessageService } from 'primeng/api';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-scheme-master',
  templateUrl: './scheme-master.component.html',
  styleUrls: ['./scheme-master.component.css']
})
export class SchemeMasterComponent implements OnInit {
  SchemeMasterData: any;
  SchemeMasterCols: any;
  FilteredArray: any = [];
  SchemeData: any;
  SchemeCode: any;
  SchemeName: any;
  SchemeType: any;
  Active: any;
  DeleteFlag: any;
  AnnavitranTNCSCID: any;
  AllotmentScheme: any;
  Scheme: any;
  RCode: any;
  NewCode: any;
  searchText: any;
  GCode: any;
  canShowMenu: boolean;
  loading: boolean;
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
    const params = {
      'Type': '1'
    };
    this.restAPIService.getByParameters(PathConstants.SCHEME_MASTER_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.SchemeMasterCols = this.tableConstants.SchemeMaster;
        this.SchemeMasterData = res;
        this.FilteredArray = res;
        this.NewCode = 'SC' + '0' + (res.length + 1);
        let sno = 0;
        this.SchemeMasterData.forEach(ss => {
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
    this.SchemeCode = selectedRow.SCCode;
    this.Scheme = selectedRow.SCCode;
    this.SchemeName = selectedRow.Name;
    this.SchemeType = selectedRow.SCType;
    this.Active = selectedRow.Activeflag;
    this.DeleteFlag = selectedRow.DeleteFlag;
    this.AllotmentScheme = selectedRow.AllotmentScheme;
    this.AnnavitranTNCSCID = selectedRow.AnnavitranTNCSCID;
  }

  onAdd() {
    this.isAdd = true;
    this.isEdited = false;
    this.SchemeName = this.Scheme = undefined;
    this.SchemeType = 'SC';
    this.SchemeCode = this.NewCode;
    this.Active = false;
  }

  onSave() {
    const params = {
      'SCCode': this.Scheme || '',
      'SCName': this.SchemeName,
      'SCType': this.SchemeType,
      'DeleteFlag': this.DeleteFlag || 'F',
      'Activeflag': this.Active,
      'AnnavitranTNCSCID': this.AnnavitranTNCSCID || '',
      'AllotmentScheme': this.SchemeCode || ''
    };
    this.restAPIService.post(PathConstants.SCHEME_MASTER_POST, params).subscribe(res => {
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
    const params = {
      'Type': '1'
    };
    this.restAPIService.getByParameters(PathConstants.SCHEME_MASTER_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.SchemeMasterCols = this.tableConstants.SchemeMaster;
        this.SchemeMasterData = res;
        this.FilteredArray = res;
        this.NewCode = 'SC' + '0' + (res.length + 1);
        let sno = 0;
        this.SchemeMasterData.forEach(ss => {
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
    this.SchemeMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.SchemeMasterData = this.FilteredArray.filter(item => {
        return item.Name.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.SchemeMasterData = this.FilteredArray;
    }
  }

  onClear() {
    this.SchemeMasterData = this.SchemeMasterCols = undefined;
    this.SchemeCode = this.SchemeName = this.SchemeType = this.Active = this.NewCode = undefined;
    this.isEdited = false;
  }
}