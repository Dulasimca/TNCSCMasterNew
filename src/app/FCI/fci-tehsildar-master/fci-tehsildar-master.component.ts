import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { StatusMessage } from 'src/app/constants/Messages';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';

@Component({
  selector: 'app-fci-tehsildar-master',
  templateUrl: './fci-tehsildar-master.component.html',
  styleUrls: ['./fci-tehsildar-master.component.css']
})
export class FciTehsildarMasterComponent implements OnInit {

  tehsildarCode: any;
  lgdtehsildarName: any;
  tehsildarName:any;
  districts: any = [];
  districtOptions: SelectItem[];
  district: any;
  canShowMenu: boolean;
  loading: boolean;
  fcitehsildarCols: any;
  fcitehsildarData: any;
  FilteredArray: any;
  Active: any;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.restAPIService.get(PathConstants.FciDistrictMaster_GET).subscribe(res => {
      this.districts = res;
      this.onView();
    })
  }

  onCheck() {
    this.fcitehsildarData.forEach(i => {
      if((i.lgd_tehsil_cod * 1) === (this.tehsildarCode * 1)) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: 'Ownership Type is already Exist,Please Update'
        });
        this.tehsildarCode = null;
      }
    })
}
  
  onSelect(type) {
    let districtSelection = [];
    switch (type) {
      case 'D':
        this.districts.forEach(d => {
          districtSelection.push({ label: d.lgd_district_name_en, value: d.lgd_district_code });
        })
        this.districtOptions = districtSelection;
        this.districtOptions.unshift({ label: '-select-', value: null });
        break;
    }
  }

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.FciTeshildarMaster_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.fcitehsildarCols = this.tableconstants.FciTeshildarMaster;
        this.fcitehsildarData = res;
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
    'lgd_tehsil_cod': this.tehsildarCode,
    'lgd_tehsil_name_en': this.lgdtehsildarName,
    'tehsil_name_ll': this.tehsildarName,
    'lgd_state_code': 33,
    'lgd_district_code': this.district,
    'active': this.Active
  };
  this.restAPIService.post(PathConstants.FciTehsildarMaster_POST, params).subscribe(res => {
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
    this.fcitehsildarData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.fcitehsildarData = this.FilteredArray.filter(item => {
        return item.lgd_tehsil_name_en.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.fcitehsildarData = this.FilteredArray;
    }
  }

  onRow(event, selectedRow) {
    this.tehsildarCode = selectedRow.lgd_tehsil_cod;
    this.lgdtehsildarName  = selectedRow.lgd_tehsil_name_en;
    this.tehsildarName  = selectedRow.tehsil_name_ll;
    this.district = selectedRow.lgd_district_code;
    this.Active = selectedRow.active;
  }

}
