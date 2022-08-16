import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { MessageService } from 'primeng/api';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rail-yard-master',
  templateUrl: './rail-yard-master.component.html',
  styleUrls: ['./rail-yard-master.component.css']
})
export class RailYardMasterComponent implements OnInit {
  RailYardMasterData: any;
  RailYardMasterCols: any;
  FilteredArray: any = [];
  RailYardData: any;
  RailYardCode: any;
  RailYardName: any;
  Active: any;
  DeleteFlag: any;
  RailYard: any;
  NewCode: any;
  RCode: any;
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
    this.restAPIService.get(PathConstants.RAILWAY_YARD_MASTER).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.RailYardMasterCols = this.tableConstants.RailYardMaster;
        this.RailYardMasterData = res;
        this.FilteredArray = res;
        this.NewCode = 'RY' + '0' + (res.length + 1);
        let sno = 0;
        this.RailYardMasterData.forEach(ss => {
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
    this.RailYardCode = selectedRow.RYCode;
    this.RailYard = selectedRow.RYCode;
    this.RailYardName = selectedRow.RYName;
    this.Active = selectedRow.Activeflag;
    this.DeleteFlag = selectedRow.DeleteFlag;
  }

  onAdd() {
    this.isAdd = true;
    this.isEdited = false;
    this.RailYardCode = this.NewCode;
    this.RailYardName = this.RailYard = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'RYCode': this.RailYard || '',
      'RYName': this.RailYardName,
      'DeleteFlag': this.DeleteFlag || 'F',
      'Activeflag': this.Active,
    };
    this.restAPIService.post(PathConstants.RAILWAY_YARD_MASTER_POST, params).subscribe(res => {
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
    this.restAPIService.get(PathConstants.RAILWAY_YARD_MASTER).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.RailYardMasterCols = this.tableConstants.RailYardMaster;
        this.RailYardMasterData = res;
        this.FilteredArray = res;
        this.NewCode = 'RY' + '0' + (res.length + 1);
        let sno = 0;
        this.RailYardMasterData.forEach(ss => {
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
    this.RailYardMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.RailYardMasterData = this.FilteredArray.filter(item => {
        return item.RYName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.RailYardMasterData = this.FilteredArray;
    }
  }

  onClear() {
    this.RailYardMasterData = this.RailYardMasterCols = undefined;
    this.RailYardCode = this.RailYardName = this.NewCode = this.RailYard = this.Active = undefined;
    this.isEdited = false;
  }
}