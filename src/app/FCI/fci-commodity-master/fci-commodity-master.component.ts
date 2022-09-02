import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { StatusMessage } from 'src/app/constants/Messages';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fci-commodity-master',
  templateUrl: './fci-commodity-master.component.html',
  styleUrls: ['./fci-commodity-master.component.css']
})
export class FciCommodityMasterComponent implements OnInit {

  commodityId: any;
  commodityName: any;
  fcicommodityCols: any;
  fcicommodityData: any;
  canShowMenu: boolean;
  loading: boolean;
  FilteredArray: any;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
  }
  
  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.FciCommodityMaster_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.fcicommodityCols = this.tableconstants.FciCommodityMaster;
        this.fcicommodityData = res;
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
    'commodity_id': this.commodityId,
    'commodity_name': this.commodityName,
  };
  this.restAPIService.post(PathConstants.FciCommodityMaster_POST, params).subscribe(res => {
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
    this.fcicommodityData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.fcicommodityData = this.FilteredArray.filter(item => {
        return item.UserName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.fcicommodityData = this.FilteredArray;
    }
  }

  onRow(event, selectedRow) {
    this.commodityId = selectedRow.commodity_id;
    this.commodityName  = selectedRow.commodity_name;
  }

}
