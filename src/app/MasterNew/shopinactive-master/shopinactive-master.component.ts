import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { StatusMessage } from 'src/app/constants/Messages';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';

@Component({
  selector: 'app-shopinactive-master',
  templateUrl: './shopinactive-master.component.html',
  styleUrls: ['./shopinactive-master.component.css']
})
export class ShopinactiveMasterComponent implements OnInit {

  acsCode: any;
  loading: boolean;
  ShopInActiveCols: any;
  ShopInActiveData: any;
  FilteredArray: any;
  canShowMenu: boolean;
  showUpdateButton: boolean;

  
  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false; 
    this.showUpdateButton = true;
  }

  onView() {
    this.loading  = true;
    this.showUpdateButton = false;
    const params = {
      'ACSCode': this.acsCode,
    };
    this.restAPIService.getByParameters(PathConstants.ShopInactive_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        console.log(res)
        this.ShopInActiveCols = this.tableconstants.ShopInactive;
        this.ShopInActiveData = res;
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

  onUpdate() {
    const params = {
      'ACSCode': this.acsCode,
    };
    this.restAPIService.post(PathConstants.UpdateIssuerMasterAcsCode_POST, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.onView();
        this.showUpdateButton = true;
        this.loading = true;      
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
}
