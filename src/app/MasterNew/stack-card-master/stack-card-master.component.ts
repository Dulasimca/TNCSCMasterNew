import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, MessageService, Message, ConfirmationService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleBasedService } from 'src/app/shared/role-based.service';

@Component({
  selector: 'app-stack-card-master',
  templateUrl: './stack-card-master.component.html',
  styleUrls: ['./stack-card-master.component.css']
})
export class StackCardMasterComponent implements OnInit {
  StackMasterData: any;
  StackMasterCols: any;
  FilteredArray: any = [];
  StackData: any;
  StackNo: any;
  CurYear: any;
  Godown: any;
  Region: any;
  GodownData: any;
  RegionData: any;
  godownOptions: SelectItem[];
  regionOptions: SelectItem[];
  yearOptions: SelectItem[];
  RowId: any;
  Active: any;
  DeleteFlag: any;
  Stack: any;
  NewCode: any;
  searchText: any;
  GCode: any;
  RCode: any;
  loggedInRCode: any;
  roleId: any;
  data: any;
  regions: any;
  canShowMenu: boolean;
  loading: boolean;
  isAdd: boolean = false;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  SaveEnable: boolean = false;
  msgs: Message[] = [];
  @ViewChild('godown', { static: false }) godownPanel: Dropdown;
  @ViewChild('region', { static: false }) regionPanel: Dropdown;
  @ViewChild('year', { static: false }) yearPanel: Dropdown;


  constructor(private authService: AuthService, private confirmationService: ConfirmationService, private roleBasedService: RoleBasedService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.regions = this.roleBasedService.getRegions();
    this.roleId = JSON.parse(this.authService.getUserAccessible().roleId);
    this.loggedInRCode = this.authService.getUserAccessible().rCode;
    this.roleId = JSON.parse(this.authService.getUserAccessible().roleId);
    this.data = this.roleBasedService.getInstance();
  }

  onSelect(item, type) {
    let regionSelection = [];
    let godownSelection = [];
    let yearSelection = [];
    switch (item) {
      case 'reg':
        this.regions = this.roleBasedService.regionsData;
        if (type === 'enter') {
          this.regionPanel.overlayVisible = true;
        }
        if (this.roleId === 1) {
          if (this.regions !== undefined) {
            this.regions.forEach(x => {
              regionSelection.push({ 'label': x.RName, 'value': x.RCode });
            });
            this.regionOptions = regionSelection;
          }
        } else {
          if (this.regions !== undefined) {
            this.regions.forEach(x => {
              if (x.RCode === this.loggedInRCode) {
                regionSelection.push({ 'label': x.RName, 'value': x.RCode });
              }
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
          this.data.forEach(x => {
            if (x.RCode === this.Region) {
              godownSelection.push({ 'label': x.GName, 'value': x.GCode, 'rcode': x.RCode, 'rname': x.RName });
            }
          });
          this.godownOptions = godownSelection;
          // this.godownOptions.unshift({ label: 'All', value: 'All' });
        }
        break;
      case 'y':
        if (type === 'enter') {
          this.yearPanel.overlayVisible = true;
        }
        if (this.yearOptions === undefined) {
          this.restAPIService.get(PathConstants.STACK_YEAR).subscribe(data => {
            if (data !== undefined) {
              data.forEach(y => {
                yearSelection.push({ 'label': y.ShortYear });
              });
              this.yearOptions = yearSelection;
            }
          });
        }
        break;
    }
  }

  onView() {
    this.loading = true;
    const params = {
      'RCode': this.Region,
      'GCode': this.GCode,
      'StackNo': this.StackNo,
      'CurYear': this.CurYear.label
    };
    this.restAPIService.getByParameters(PathConstants.STACK_CARD_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.StackMasterCols = this.tableConstants.StackCardMaster;
        this.StackMasterData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.StackMasterData.forEach(ss => {
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
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.StackNo = selectedRow.StackNo;
    this.RowId = selectedRow.RowId;
    this.Active = selectedRow.Flag1;
    this.SaveEnable = true;
  }

  onSave() {
    const params = {
      'RowId': this.RowId,
      'Flag': this.Active,
    };
    this.restAPIService.post(PathConstants.STACK_CARD_UPDATE_POST, params).subscribe(res => {
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
    this.SaveEnable = false;
  }

  // onDelete() {
  //   {
  //     this.confirmationService.confirm({
  //       message: 'Do you want to delete this Stack Card?',
  //       header: 'Delete Confirmation',
  //       icon: 'pi pi-info-circle',
  //       accept: () => {
  //         this.messageService.clear();
  //         this.messageService.add({
  //           key: 't-err', severity: StatusMessage.SEVERITY_SUCCESS,
  //           summary: StatusMessage.SUMMARY_SUCCESS, detail: StatusMessage.StackcardDeleted
  //         });
  //       },
  //       reject: () => {
  //         this.onClear();
  //       }
  //     });
  //   }
  // }

  onSearch(value) {
    this.StackMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.StackMasterData = this.FilteredArray.filter(item => {
        return item.StackNo.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.StackMasterData = this.FilteredArray;
    }
  }

  onResetTable(item) {
    if (item === 'reg') { this.GCode = null; }
    this.StackMasterData = [];
  }

  onClear() {
    this.godownOptions = this.regionOptions = this.yearOptions = undefined;
    this.StackNo = this.RowId = undefined;
    this.Active = false;
    this.isEdited = false;
    this.SaveEnable = false;
  }
}