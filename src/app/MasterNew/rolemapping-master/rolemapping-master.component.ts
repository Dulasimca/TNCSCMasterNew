import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-rolemapping-master',
  templateUrl: './rolemapping-master.component.html',
  styleUrls: ['./rolemapping-master.component.css']
})
export class RolemappingMasterComponent implements OnInit {

  mappingId: any;
  name: any;
  roleId: any;
  RoleMappingData: any;
  RoleMappingCols: any;
  canShowMenu: boolean;
  loading: boolean;
  FilteredArray: any;
  roleName: any = [];
  roleIdOptions: SelectItem[];

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;   
    this.restAPIService.get(PathConstants.RoleMaster_GET).subscribe(res => {
      this.roleName = res;
    })
    this.onView();
  }

  onCheck() {
    let max = this.RoleMappingData[0]; 
    if(this.RoleMappingData.length !==0) {
      for(let i = 1; i < this.RoleMappingData.length; i++) {
        if(this.RoleMappingData[i] > max) {
              max = this.RoleMappingData[i];
        } else {
          continue;
        }
      }
    }
  }

  onSelect(type) {
    let rolenameSelection = [];
    switch (type) {
      case 'D':
        this.roleName.forEach(d => {
          rolenameSelection.push({ label: d.RoleName, value: d.RoleId });
        })
        this.roleIdOptions = rolenameSelection;
        this.roleIdOptions.unshift({ label: '-select-', value: null });
        break;
    }
  }

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.RoleMapping_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.RoleMappingCols = this.tableconstants.RoleMaster;
        this.RoleMappingData = res;
        this.FilteredArray = res;
        // this.mappingId = res.MappingId;
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
    setTimeout(() => {
      this.autoIncrement();
    }, 300)
  }

  onSave() {
    const params = {
      'MappingId': this.mappingId,
      'Name': this.name,
      'RoleId': this.roleId
    };
    this.restAPIService.post(PathConstants.RoleMapping_POST, params).subscribe(res => {
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

  onRow(event, selectedRow) {
    this.mappingId = selectedRow.MappingId;
    this.name = selectedRow.MappingName;
    this.roleId = selectedRow.RoleId;
    this.roleIdOptions  = [{ label: selectedRow.RoleName, value: selectedRow.RoleId}];
  }

  onSearch(value) {
    this.RoleMappingData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.RoleMappingData = this.FilteredArray.filter(item => {
        return item.MappingId.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.RoleMappingData = this.FilteredArray;
    }
  }
  autoIncrement() {
    if(this.FilteredArray.length >=0) {
      this.mappingId = this.FilteredArray.length + 1;
    }
  }
  
  onClear(){
    this.mappingId = null;
    this.name = null;
    this.roleId = null;
  }
}
