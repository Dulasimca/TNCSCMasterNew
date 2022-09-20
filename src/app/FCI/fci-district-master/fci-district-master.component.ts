import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { RoleBasedService } from 'src/app/shared/role-based.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fci-district-master',
  templateUrl: './fci-district-master.component.html',
  styleUrls: ['./fci-district-master.component.css']
})
export class FciDistrictMasterComponent implements OnInit {

  lgddisName: any;
  districtName: any;
  Active: any;
  RCode: any;
  regionOptions: SelectItem[];
  @ViewChild('region', { static: false }) regionPanel: Dropdown;
  roleId: any;
  loggedInRCode: string;
  regions?: any;
  loading: boolean;
  canShowMenu: boolean;
  fcidistrictCols: any;
  fcidistrictData: any = [];
  FilteredArray: any;
  districtCode: any;
  editValue = 0;
  dCode: any;
  data: any[] = [];
  searchText: any;


  constructor(private authService: AuthService, private roleBasedService: RoleBasedService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.roleId = JSON.parse(this.authService.getUserAccessible().roleId);
    this.loggedInRCode = this.authService.getUserAccessible().rCode;
    this.regions = this.roleBasedService.getRegions();
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.fcidistrictCols = this.tableconstants.FciDistrictMaster;
    this.onView();
  }

  onCheck() {
      this.fcidistrictData.forEach(i => {
        if((i.lgd_district_code * 1) === (this.districtCode * 1)) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
            summary: StatusMessage.SUMMARY_WARNING, detail: 'District Code is already Exist,Please Update'
          });
          this.districtCode = null;
        }
      })
  }

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.FciDistrictMaster_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {    
        this.fcidistrictData = res;
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
    'lgd_district_name_en': this.lgddisName,
    'district_name_ll': this.districtName,
    'lgd_district_code': this.districtCode,
    'lgd_state_code': 33,
    'RCode': this.RCode,
    'active': this.Active
  };
  this.restAPIService.post(PathConstants.FciDistrictMaster_POST, params).subscribe(res => {
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
    this.fcidistrictData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.fcidistrictData = this.FilteredArray.filter(item => {
        return item.lgd_district_name_en.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.fcidistrictData = this.FilteredArray;
    }
  }

  onRow(event, selectedRow) {
    this.lgddisName = selectedRow.lgd_district_name_en;
    this.districtName  = selectedRow.district_name_ll;
    this.districtCode = selectedRow.lgd_district_code;
    this.RCode  = selectedRow.RCode;
    this.regionOptions = [{ label: selectedRow.RGNAME, value: selectedRow.RCode }]
    this.Active = selectedRow.active;
  }


  onSelect(item, type) {
    let regionSelection = [];
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
    }
  }

  onClear() {
    this.districtCode = null;
    this.districtName = null;
    this.lgddisName = null;
    this.RCode  = null;
    this.Active = null;
  }
}
