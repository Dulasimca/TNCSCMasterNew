import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { StatusMessage } from 'src/app/constants/Messages';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';

@Component({
  selector: 'app-fci-ownership-type',
  templateUrl: './fci-ownership-type.component.html',
  styleUrls: ['./fci-ownership-type.component.css']
})
export class FciOwnershipTypeComponent implements OnInit {

  ownershipType: any;
  ownershipName: any;
  fciownertypeCols: any;
  fciownertypeData: any;
  canShowMenu: boolean;
  loading: boolean;
  FilteredArray: any;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.onView();
  }

  onCheck() {
    this.fciownertypeData.forEach(i => {
      if((i.ownership_type * 1) === (this.ownershipType * 1)) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: 'Ownership Type is already Exist,Please Update'
        });
        this.ownershipType = null;
      }
    })
}

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.FciOwnershipType_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.fciownertypeCols = this.tableconstants.FciOwnershipType;
        this.fciownertypeData = res;
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
    'ownership_type': this.ownershipType,
    'ownership_Name': this.ownershipName,
  };
  this.restAPIService.post(PathConstants.FciOwnershipType_POST, params).subscribe(res => {
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
    this.fciownertypeData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.fciownertypeData = this.FilteredArray.filter(item => {
        return item.ownership_Name.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.fciownertypeData = this.FilteredArray;
    }
  }

  onRow(event, selectedRow) {
    this.ownershipType = selectedRow.ownership_type;
    this.ownershipName  = selectedRow.ownership_Name;
  }

}
