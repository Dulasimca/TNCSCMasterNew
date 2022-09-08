import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/components/common/api';
import { StatusMessage } from 'src/app/constants/Messages';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';

@Component({
  selector: 'app-fci-ownershipgroup-type',
  templateUrl: './fci-ownershipgroup-type.component.html',
  styleUrls: ['./fci-ownershipgroup-type.component.css']
})
export class FciOwnershipgroupTypeComponent implements OnInit {

  ownershipGroup: any;
  groupName: any;
  fciownershipCols: any;
  fciownershipData: any;
  loading: boolean;
  FilteredArray: any;
  canShowMenu: boolean;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.onView();
  }

  
  onCheck() {
    this.fciownershipData.forEach(i => {
      if((i.ownership_group_type * 1) === (this.ownershipGroup * 1)) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: 'Ownership Type is already Exist,Please Update'
        });
        this.ownershipGroup = null;
      }
    })
}

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.FciOwnershipGroup_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.fciownershipCols = this.tableconstants.FciOwnershipGroup;
        this.fciownershipData = res;
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
      'ownership_group_type': this.ownershipGroup,
      'ownership_group_Name': this.groupName,
    };
    this.restAPIService.post(PathConstants.FciOwnershipGroup_POST, params).subscribe(res => {
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

  onRow(event, selectedRow) {
    this.ownershipGroup = selectedRow.ownership_group_type;
    this.groupName = selectedRow.ownership_group_Name;
  }

  onSearch(value) {
    this.fciownershipData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.fciownershipData = this.FilteredArray.filter(item => {
        return item.ownership_group_Name.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.fciownershipData = this.FilteredArray;
    }
  }

}
