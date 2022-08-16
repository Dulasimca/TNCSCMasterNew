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
  selector: 'app-gunny-type-master',
  templateUrl: './gunny-type-master.component.html',
  styleUrls: ['./gunny-type-master.component.css']
})
export class GunnyTypeMasterComponent implements OnInit {
  gunnyCols: any;
  gunnyData: any = [];
  activeOptions: SelectItem[];
  GunnyName: string;
  GunnyCode: string;
  Gunny: any;
  NewCode: any;
  FilteredArray: any;
  Flag: string;
  label: string = 'Save';
  isSelected: boolean = false;
  loading: boolean;
  Active: any;
  DeleteFlag: boolean;
  canShowMenu: boolean;
  isAdd: boolean = false;
  // isEdited: boolean = false;
  searchText: any;

  constructor(private authService: AuthService, private restAPI: RestAPIService, private tableconstants: TableConstants, private messageService: MessageService) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.restAPI.get(PathConstants.GUNNY_TYPE_GET).subscribe(res => {
      if (res !== undefined && res !== null) {
        this.gunnyCols = this.tableconstants.GunnyType;
        this.gunnyData = res;
        this.FilteredArray = res;
        this.NewCode = 'GT' + '00' + (res.length + 1);
        let sno = 0;
        this.gunnyData.forEach(S => {
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
    this.activeOptions = [{ label: 'Active', value: 'A' }, { label: 'InActive', value: 'I' }];
  }

  onRowSelect(event, selectedRow) {
    this.isSelected = true;
    this.label = 'Update';
    this.GunnyCode = selectedRow.GTCODE;
    this.Gunny = selectedRow.GTCODE;
    this.GunnyName = selectedRow.GTType;
    this.Active = selectedRow.Activeflag;
    this.DeleteFlag = selectedRow.DeleteFlag;
  }

  onAdd() {
    this.isAdd = true;
    this.isSelected = false;
    this.GunnyCode = this.NewCode;
    this.GunnyName = this.Gunny = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'GTCode': this.Gunny || '',
      'GTType': this.GunnyName,
      'DeleteFlag': this.DeleteFlag || 'F',
      'Activeflag': this.Active,
    };
    this.restAPI.post(PathConstants.GUNNY_TYPE_POST, params).subscribe(res => {
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
    this.restAPI.get(PathConstants.GUNNY_TYPE_GET).subscribe(res => {
      if (res !== undefined && res !== null) {
        this.gunnyCols = this.tableconstants.GunnyType;
        this.gunnyData = res;
        this.FilteredArray = res;
        this.NewCode = 'GT' + '00' + (res.length + 1);
        let sno = 0;
        this.gunnyData.forEach(S => {
          sno += 1;
          S.SlNo = sno;
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
    this.gunnyData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.gunnyData = this.FilteredArray.filter(item => {
        return item.GTType.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.gunnyData = this.FilteredArray;
    }
  }

  onClear() {
    this.activeOptions = undefined;
    this.GunnyCode = this.GunnyName = this.NewCode = undefined;
    this.label = 'Save';
    this.Active = false;
    this.isSelected = false;
    this.isSelected = false;
  }
}
