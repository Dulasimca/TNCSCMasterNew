import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleBasedService } from 'src/app/shared/role-based.service';

@Component({
  selector: 'app-depositor-master',
  templateUrl: './depositor-master.component.html',
  styleUrls: ['./depositor-master.component.css']
})
export class DepositorMasterComponent implements OnInit {
  DepositorMasterData: any;
  DepositorMasterCols: any;
  DepositorMasterTypeTenderer: any;
  DepositorData: any;
  FilteredArray: any;
  DepositorCode: any;
  DepositorName: any;
  Active: any;
  DeleteFlag: any;
  depositorOptions: SelectItem[];
  regionOptions: SelectItem[];
  godownOptions: SelectItem[];
  Depositor: any;
  RCode: any;
  GCode: any;
  regions: any;
  roleId: any;
  data?: any;
  loggedInRCode: any;
  canShowMenu: boolean;
  searchText: any;
  loading: boolean;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  excelEnable: boolean = false;
  Tenderer: "TY028";
  LedgerId: any;
  GST: any;
  @ViewChild('depositor', { static: false }) depositorPanel: Dropdown;
  @ViewChild('godown', { static: false }) godownPanel: Dropdown;
  @ViewChild('region', { static: false }) regionPanel: Dropdown;


  constructor(private authService: AuthService, private roleBasedService: RoleBasedService, private restAPIService: RestAPIService,
    private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    // this.RCode = this.authService.getUserAccessible().rCode;
    // this.GCode = this.authService.getUserAccessible().gCode;
    this.regions = this.roleBasedService.getRegions();
    this.roleId = JSON.parse(this.authService.getUserAccessible().roleId);
    this.data = this.roleBasedService.getInstance();
    this.loggedInRCode = this.authService.getUserAccessible().rCode;
  }

  onSelect(item, type) {
    let depositorSelection = [];
    let regionSelection = [];
    let godownSelection = [];
    switch (item) {
      case 'depositor':
        if (type === 'enter') {
          this.depositorPanel.overlayVisible = true;
        }
        if (this.depositorOptions === undefined) {
          const params = {
            'TRCode': 'D'
          };
          this.restAPIService.getByParameters(PathConstants.DEPOSITOR_TYPE_MASTER, params).subscribe(res => {
            if (res !== undefined) {
              this.DepositorData = res;
              this.DepositorData.forEach(data => {
                depositorSelection.push({ 'label': data.Tyname, 'value': data.Tycode });
              });
              this.depositorOptions = depositorSelection;
            }
          });
        }
        break;
      case 'reg':
        this.regions = this.roleBasedService.regionsData;
        if (type === 'enter') {
          this.regionPanel.overlayVisible = true;
        }
        if (this.roleId === 1) {
          if (this.regions !== undefined) {
            regionSelection.push({ label: 'All', value: null });
            this.regions.forEach(x => {
              regionSelection.push({ label: x.RName, value: x.RCode });
            });
            this.regionOptions = regionSelection;
          }
        }
        break;
      case 'gd':
        if (type === 'enter') {
          this.godownPanel.overlayVisible = true;
        }
        if (this.data !== undefined) {
          godownSelection.push({ label: 'All', value: null });
          this.data.forEach(x => {
            if (x.RCode === this.RCode.value) {
              godownSelection.push({ label: x.GName, value: x.GCode });
            }
          });
          this.godownOptions = godownSelection;
        }
        break;
    }
  }

  onView() {
    this.loading = true;
    const params = {
      'DepositorType': this.Depositor
    };
    this.restAPIService.getByParameters(PathConstants.DEPOSITOR_MASTER_TYPE_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        (this.Depositor === 'TY028') ? this.DepositorMasterCols = this.tableConstants.DepositorMasterTypeTenderer : this.DepositorMasterCols = this.tableConstants.DepositorMasterType;
        this.DepositorMasterData = res;
        this.FilteredArray = res;
        this.loading = false;
        this.excelEnable = true;
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
    this.DepositorCode = selectedRow.DepositorCode;
    this.DepositorName = selectedRow.DepositorName;
    this.Active = selectedRow.ActiveFlag;
    this.DeleteFlag = selectedRow.DeleteFlag;
    if (this.Depositor === 'TY028') {
      this.LedgerId = selectedRow.LedgerID;
      this.GST = selectedRow.Gst;
    }
  }

  onAdd() {
    this.isEdited = true;
    this.DepositorCode = this.DepositorName = this.DeleteFlag = this.LedgerId = this.GST = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'RCode': this.RCode.value,
      // 'GCode': (this.RCode.value = 'All') ? '' : this.GCode.value,
      'GCode': this.GCode.value,
      'DepositorCode': this.DepositorCode || '',
      'DepositorName': this.DepositorName,
      'DepositorType': this.Depositor,
      'DeleteFlag': this.DeleteFlag || 'F',
      'ActiveFlag': this.Active,
      'GstNo': this.GST || '',
      'LedgerId': this.LedgerId || ''
    };
    this.restAPIService.post(PathConstants.DEPODITOR_MASTER_TYPE_POST, params).subscribe(res => {
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
    this.DepositorMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.DepositorMasterData = this.FilteredArray.filter(item => {
        return item.DepositorName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.DepositorMasterData = this.FilteredArray;
    }
  }
  onReset(item) {
    if (item === 'reg') { this.GCode = null; }
    if (item === 'depositor') {
      this.onClear();
      this.excelEnable = false;
    }
  }

  onClear() {
    this.DepositorMasterData = this.DepositorMasterCols = undefined;
    this.DepositorCode = this.DepositorName = this.Active = this.LedgerId = this.GST = null;
    this.isEdited = false;
  }
}