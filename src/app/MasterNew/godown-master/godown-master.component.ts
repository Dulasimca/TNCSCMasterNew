import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-godown-master',
  templateUrl: './godown-master.component.html',
  styleUrls: ['./godown-master.component.css']
})
export class GodownMasterComponent implements OnInit {
  GodownMasterData: any;
  GodownMasterCols: any;
  GodownData: any;
  FilteredArray: any;
  GodownCode: any;
  GodownName: any;
  Region: any;
  Active: any;
  DeleteFlag: any;
  godownOptions: SelectItem[];
  operationalTypeOptions: SelectItem[];
  ownerTypeOptions: SelectItem[];
  cbOptions: SelectItem[];
  allotmentOptions: SelectItem[];
  dsOptions: SelectItem[];
  Godown: any;
  RCode: any;
  GCode: any;
  canShowMenu: boolean;
  searchText: any;
  Capacity: any;
  Carpet: any;
  Shops: any;
  OperationalType: any;
  OperationalCode: any;
  OwnerCode: any;
  OwnerType: any;
  SessionFlag: boolean;
  ExportFlag: boolean;
  loading: boolean;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  Allotment: boolean;
  CB: boolean;
  DocStatus: boolean;
  pds: any;
  shopSociety: any;
  taxInvoice: any;
  advanceDay: any = 21;
  exp: RegExp = /^[pbPB]+$/;
  int: RegExp = /[1-31]$/;
  num: RegExp = /[0-1]$/;

  @ViewChild('godown', { static: false }) godownPanel: Dropdown;
  @ViewChild('operational', { static: false }) operationalTypePanel: Dropdown;
  @ViewChild('owner', { static: false }) ownerTypePanel: Dropdown;
  @ViewChild('cb', { static: false }) cbPanel: Dropdown;
  @ViewChild('allotment', { static: false }) allotmentPanel: Dropdown;
  @ViewChild('doc', { static: false }) docPanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService,
    private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
  }

  onSelect(item, type) {
    let godownSelection = [];
    let operationalTypeSelection = [];
    let ownerTypeSelection = [];
    let cbSelection = [];
    let allotmentSelection = [];
    let docSelection = [];
    switch (item) {
      case 'godown':
        if (type === 'enter') {
          this.godownPanel.overlayVisible = true;
        }
        if (this.godownOptions === undefined) {
          this.restAPIService.get(PathConstants.GODOWN_DATA).subscribe(res => {
            if (res !== undefined) {
              this.GodownData = res;
              this.GodownData.forEach(data => {
                godownSelection.push({ label: data.Name, value: data.Code });
              });
              this.godownOptions = godownSelection;
            }
          });
        }
        break;
      case 'operationalType':
        if (type === 'enter') {
          this.operationalTypePanel.overlayVisible = true;
        }
        // if (this.operationalTypeOptions === undefined) {
        operationalTypeSelection.push({ label: 'Operational Godown', value: 'O ' },
          { label: 'Buffer Godown', value: 'B ' }, { label: 'Gunny Godown', value: 'G ' }, { label: 'Cap', value: 'C ' });
        operationalTypeSelection.unshift({ label: '-select-', value: null, disabled: true });
        // }
        this.operationalTypeOptions = operationalTypeSelection;
        break;
      case 'ownerType':
        if (type === 'enter') {
          this.ownerTypePanel.overlayVisible = true;
        }
        // if (this.ownerTypeOptions === undefined) {
        ownerTypeSelection.push({ label: 'OWNED', value: 'O' },
          { label: 'HIRED', value: 'H' }, { label: 'CWC', value: 'C' }, { label: 'TNWC', value: 'TW' });
        ownerTypeSelection.unshift({ label: '-select-', value: null, disabled: true });
        // }
        this.ownerTypeOptions = ownerTypeSelection;
        break;
      case 'cb':
        if (type === 'enter') {
          this.cbPanel.overlayVisible = true;
        }
        cbSelection.push({ label: 'False - 0', value: false }, { label: 'True - 1', value: true });
        cbSelection.unshift({ label: '-select-', value: null, disabled: true });
        this.cbOptions = cbSelection;
        break;
      case 'allotment':
        if (type === 'enter') {
          this.allotmentPanel.overlayVisible = true;
        }
        allotmentSelection.push({ label: 'False - 0', value: false }, { label: 'True - 1', value: true });
        allotmentSelection.unshift({ label: '-select-', value: null, disabled: true });
        this.allotmentOptions = allotmentSelection;
        break;
      case 'Doc':
        if (type === 'enter') {
          this.docPanel.overlayVisible = true;
        }
        docSelection.push({ label: 'False - 0', value: false }, { label: 'True - 1', value: true });
        docSelection.unshift({ label: '-select-', value: null, disabled: true });
        this.dsOptions = docSelection;
        break;
    }
  }

  onView() {
    this.loading = true;
    const params = {
      'RCode': this.Region,
      // 'GCode': this.GCode
    };
    this.restAPIService.getByParameters(PathConstants.GODOWN_MASTER_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.GodownMasterCols = this.tableConstants.GodownMaster;
        this.GodownMasterData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.GodownMasterData.forEach(s => {
          sno += 1;
          s.SlNo = sno;
          (s.CBStatement === true) ? s.CBS = 1 : s.CBS = 0;
          (s.Allotment === true) ? s.ALT = 1 : s.ALT = 0;
          (s.DocStatus === true) ? s.DStatus = 1 : s.DStatus = 0;
          // (s.OPERATIONTYPE === 'O ') ? s.OPERATIONTYPE = 'Operational Godown' : s.OPERATIONTYPE = 'O ';
          // (s.OPERATIONTYPE === 'B ') ? s.OPERATIONTYPE = 'Buffer Godown' : s.OPERATIONTYPE = 'B ';
          // (s.OPERATIONTYPE === 'G ') ? s.OPERATIONTYPE = 'Gunny Godown' : s.OPERATIONTYPE = 'G ';
          // (s.OPERATIONTYPE === 'C ') ? s.OPERATIONTYPE = 'Cap' : s.OPERATIONTYPE = 'C ';

          // (s.TNCSType === 'O') ? s.TNCSType = 'OWNED' : 'O';
          // (s.TNCSType === 'H') ? s.TNCSType = 'HIRED' : 'H';
          // (s.TNCSType === 'C') ? s.TNCSType = 'CWC' : 'C';
          // (s.TNCSType === 'TW') ? s.TNCSType = 'TNWC' : 'TW';
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
    this.onClear();
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.operationalTypeOptions = [{ label: selectedRow.OPERATIONTYPE, value: selectedRow.OPERATIONTYPE }];
    this.ownerTypeOptions = [{ label: selectedRow.TNCSType, value: selectedRow.TNCSType }];
    this.cbOptions = [{ label: selectedRow.CBStatement, value: selectedRow.CBStatement }];
    this.allotmentOptions = [{ label: selectedRow.Allotment, value: selectedRow.Allotment }];
    this.dsOptions = [{ label: selectedRow.DocStatus, value: selectedRow.DocStatus }];
    this.GodownCode = selectedRow.TNCSCode;
    this.GodownName = selectedRow.TNCSName;
    this.Godown = selectedRow.TNCSRegn;
    this.Capacity = selectedRow.TNCSCapacity;
    this.Carpet = selectedRow.TNCSCarpet;
    this.Shops = selectedRow.NOOFSHOPCRS;
    this.OperationalType = selectedRow.OPERATIONTYPE;
    this.OperationalCode = selectedRow.OperationalType;
    this.OwnerCode = selectedRow.OwnerType;
    this.OwnerType = selectedRow.TNCSType;
    this.SessionFlag = selectedRow.SessionFlag;
    this.ExportFlag = selectedRow.ExportFlag;
    this.Active = selectedRow.ActiveFlag;
    this.DeleteFlag = selectedRow.DeleteFlag;
    this.CB = selectedRow.CBStatement;
    this.Allotment = selectedRow.Allotment;
    this.DocStatus = selectedRow.DocStatus;
    this.pds = selectedRow.PDS;
    this.shopSociety = selectedRow.noofshopsociety;
    this.taxInvoice =  selectedRow.TaxInvoice;
    this.advanceDay = selectedRow.AdvancedDay;
  }

  onAdd() {
    this.isEdited = true;
    this.isViewed = false;
    this.operationalTypeOptions = this.ownerTypeOptions = this.cbOptions = this.allotmentOptions = this.dsOptions = undefined;
    this.GodownCode = this.GodownName = this.Capacity = this.Carpet = this.Shops = this.SessionFlag = this.ExportFlag = this.CB = null;
    this.OperationalType = this.OperationalCode = this.OwnerType = this.OwnerCode = this.DeleteFlag = this.Allotment = this.DocStatus = null;
    this.Active = false;
  }

  onSave() {
    const params = {
      'TNCSCode': this.GodownCode || '',
      'TNCSName': this.GodownName,
      'TNCSRegn': this.Godown || this.Region,
      'TNCSType': this.OwnerType.value || this.OwnerType,
      'TNCSCarpet': this.Carpet,
      'TNCSCapacity': this.Capacity,
      'SessionFlag': this.SessionFlag || '',
      'ExportFlag': this.ExportFlag || '',
      'OPERATIONTYPE': this.OperationalType.value || this.OperationalType,
      'NOOFSHOPCRS': this.Shops || 0,
      'DocStatus': this.DocStatus,
      'DeleteFlag': this.DeleteFlag || 'F',
      'ActiveFlag': this.Active,
      'CBStatement': this.CB,
      'Allotment': this.Allotment,
      'PDS': this.pds,
      'noofshopsociety': this.shopSociety,
      'TaxInvoice': this.taxInvoice,
      'AdvancedDay': this.advanceDay
    };
    this.restAPIService.post(PathConstants.GODOWN_MASTER_POST, params).subscribe(res => {
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
  }


  onSearch(value) {
    this.GodownMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.GodownMasterData = this.FilteredArray.filter(item => {
        return item.TNCSName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.GodownMasterData = this.FilteredArray;
    }
  }
  onReset(item) {
    if (item === 'godown') {
      this.GodownMasterData = this.GodownMasterCols = undefined;
      // this.onClear();
    }
    // if (item === 'operational') {
    // this.operationalTypeOptions = undefined;
    // this.OperationalType = null;
    // }
    // if (item === 'owner') {
    // this.ownerTypeOptions = undefined;
    //   this.OwnerType = null;
    // }
  }

  onClear() {
    this.GodownMasterData = this.GodownMasterCols = this.operationalTypeOptions = this.ownerTypeOptions = undefined;
    this.cbOptions = this.allotmentOptions = this.dsOptions = undefined;
    this.GodownCode = this.GodownName = this.Capacity = this.Carpet = this.Shops = this.OperationalType = this.OwnerType = null;
    this.CB = this.Allotment = this.Active = this.DocStatus = null;
    this.isEdited = false;
  }

  OnCheck() {
    if(this.advanceDay !== null && this.advanceDay !== undefined && this.advanceDay !== 21 && this.advanceDay.length === 2) {
      this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: 'Whether this day '+ this.advanceDay +' is updated in G2G portal (POS machine) or not. If not document will not transferred to G2G Portal so please don’t change the day.'
        });
    }else {
      this.messageService.clear();
    }
  }
}