import { Component, OnInit } from '@angular/core';
import { PathConstants } from 'src/app/constants/path.constants';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { SelectItem, MessageService } from 'primeng/api';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fci-bag-type',
  templateUrl: './fci-bag-type.component.html',
  styleUrls: ['./fci-bag-type.component.css']
})
export class FciBagTypeComponent implements OnInit {

  bagName: any;
  tareWeight: any;
  bagId: any;
  FciBagTypeCols: any;
  FciBagTypeData: any;
  FilteredArray: any;
  loading: boolean;
  canShowMenu: boolean;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.onView();
  }

  
  onCheck() {
    this.FciBagTypeData.forEach(i => {
      if((i.bag_type_id * 1) === (this.bagId * 1)) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: 'Bag ID is already Exist,Please Update'
        });
        this.bagId = null;
      }
    })
}

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.FciBagType_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.FciBagTypeCols = this.tableconstants.FciBagType;
        this.FciBagTypeData = res;
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
    'bag_type_id': this.bagId,
    'bag_type_name': this.bagName,
    'tare_weight': this.tareWeight
  };
  this.restAPIService.post(PathConstants.FciBagType_POST, params).subscribe(res => {
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
    this.bagId = selectedRow.bag_type_id;
    this.bagName  = selectedRow.bag_type_name;
    this.tareWeight = selectedRow.tare_weight;
  }

  onSearch(value) {
    this.FciBagTypeData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.FciBagTypeData = this.FilteredArray.filter(item => {
        return item.bag_type_name.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.FciBagTypeData = this.FilteredArray;
    }
  }

  onClear() {
    this.bagId = null;
    this.bagName  = null;
    this.tareWeight = null;
  }


}
