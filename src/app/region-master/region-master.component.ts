import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { RestAPIService } from '../services/restAPI.service';
import { PathConstants } from '../constants/path.constants';
import { TableConstants } from '../constants/table.constants';
import { StatusMessage } from '../constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-region-master',
  templateUrl: './region-master.component.html',
  styleUrls: ['./region-master.component.css']
})
export class RegionMasterComponent implements OnInit {
  regionCols: any;
  regionData: any;
  loading: boolean;
  label: string = 'Save';
  canShowMenu: boolean;
  FilteredArray: any;
  isSelected: boolean = false;
  SessionFlag: any;
  isEdited: boolean = false;
  rgCode: any;
  regionName: any;
  sessionFlag: any;
  address1: any;
  address2: any;
  phoneNumber: any;
  pinCode: any;
  emailId: any;

  constructor(private TableConstants: TableConstants, private restApi: RestAPIService, private authService: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.restApi.get(PathConstants.REGION_DATA).subscribe(res => {
      if (res !== undefined && res !== null) {
        this.regionCols = this.TableConstants.RegionMasterCols;
        this.regionData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.regionData.forEach(S => {
          sno += 1;
          S.SlNo = sno;
        });
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

  onRowSelect(event, selectedRow) {
    this.isSelected = true;
    this.isEdited = true;
    // this.label = 'Update';
    this.regionName = selectedRow.RGNAME;
    this.rgCode = selectedRow.RGCODE;
    this.SessionFlag = selectedRow.SessionFlag;
    this.address1 = selectedRow.Address1;
    this.address2 = selectedRow.Address2;
    this.phoneNumber = selectedRow.PhoneNo;
    this.pinCode  = selectedRow.Pincode;
    this.emailId  = selectedRow.Emailid 
  }

  onView() {
    this.restApi.get(PathConstants.REGION_DATA).subscribe(res => {
      if (res !== undefined && res !== null) {
        this.regionCols = this.TableConstants.RegionMasterCols;
        this.regionData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.regionData.forEach(S => {
          sno += 1;
          S.SlNo = sno;
        });
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
      'RGCODE': this.rgCode || '',
      'RGNAME': this.regionName,
      'SessionFlag': this.SessionFlag || 'N',
      'Address1': this.address1,
      'Address2': this.address2,
      'PhoneNo': this.phoneNumber,
      'Pincode': this.pinCode,
      'Emailid': this.emailId
    };
    this.restApi.post(PathConstants.REGION_POST, params).subscribe(res => {
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

  onClear() {
    this.isSelected = false;
    this.rgCode = this.regionName = this.SessionFlag = undefined;
    this.address1 = null;
    this.address2 = null;
    this.pinCode = null;
    this.phoneNumber = null;
    this.emailId = null;
  }
  onAdd() {
    this.isEdited = true;
  }
  
}
