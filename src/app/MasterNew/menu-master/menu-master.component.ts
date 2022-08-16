import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/primeng';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.css']
})
export class MenuMasterComponent implements OnInit {
  MenuMasterData: any;
  MenuMasterCols: any;
  MenuName: any;
  ID: any;
  url: any;
  ParentID: any;
  MenuId: any;
  RoleMappingOptions: SelectItem[];
  RoleMapping: any;
  RoleMappingData: any;
  FilteredArray: any;
  Active: any;
  canShowMenu: boolean;
  searchText: any;
  loading: boolean;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  @ViewChild('role', { static: false }) rolePanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService,
    private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
  }

  onSelect(item, type) {
    let roleSelection = [];
    switch (item) {
      case 'RoleMapping':
        if (type === 'enter') {
          this.rolePanel.overlayVisible = true;
        }
        if (this.RoleMappingOptions === undefined) {
          this.restAPIService.get(PathConstants.ROLE_MAPPING).subscribe(res => {
            if (res !== undefined) {
              this.RoleMappingData = res;
              this.RoleMappingData.forEach(data => {
                roleSelection.push({ label: data.MappingName, value: data.MappingId, RoleId: data.RoleId });
              });
              roleSelection.unshift({ label: '-select-', value: null, disabled: true });
              this.RoleMappingOptions = roleSelection;
            }
          });
        }
        break;
    }
  }

  onView() {
    this.loading = true;
    const params = {
      'RoleId': this.RoleMapping.value,
    };
    this.restAPIService.getByParameters(PathConstants.MENU_MASTER_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.MenuMasterCols = this.tableConstants.MenuMaster;
        this.MenuMasterData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.MenuMasterData.forEach(s => {
          sno += 1;
          s.SlNo = sno;
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

  onAdd() {
    this.isEdited = true;
    this.isViewed = false;
    // this.RoleMappingOptions = this.RoleMapping = undefined;
    this.MenuId = this.ID = this.MenuName = this.url = this.ParentID = null;
    this.Active = false;
  }


  onSave() {
    const params = {
      'MenuId': this.MenuId || 0,
      'ID': this.ID,
      'MenuName': this.MenuName,
      'URL': '/' + this.url,
      'ParentId': this.ParentID,
      'RoleId': this.RoleMapping.value,
      'Active': this.Active,
    };
    this.restAPIService.post(PathConstants.MENU_MASTER_POST, params).subscribe(res => {
      if (res) {
        this.onView();
        this.isEdited = false;
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
    this.MenuMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.MenuMasterData = this.FilteredArray.filter(item => {
        return item.Name.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.MenuMasterData = this.FilteredArray;
    }
  }
  onReset(item) {
    if (item === 'user') {
      this.MenuMasterData = this.MenuMasterCols = undefined;
      // } else if (item === 'role') {
      // this.enableRegion = this.enableGodown = this.GCode = this.RCode = undefined;
    }
  }

  onClear() {
    this.MenuId = this.ID = this.MenuName = this.url = this.ParentID = null;
    this.MenuMasterData = this.MenuMasterCols = this.RoleMappingOptions = this.RoleMapping = null;
    this.isEdited = this.Active = false;
  }
}