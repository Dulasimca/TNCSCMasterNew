import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { StatusMessage } from 'src/app/constants/Messages';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';

@Component({
  selector: 'app-fci-state-master',
  templateUrl: './fci-state-master.component.html',
  styleUrls: ['./fci-state-master.component.css']
})
export class FciStateMasterComponent implements OnInit {

  lgdstateName: any;
  stateName: any;
  Active: any;
  canShowMenu: boolean;
  loading: boolean;
  fcistateCols: any;
  fcistateData: any = [];
  FilteredArray: any;
  stateCode: any;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableconstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.fcistateCols = this.tableconstants.FciStateMaster;
    this.onView();
  }

  onCheck() {
    this.fcistateData.forEach(i => {
      if((i.lgd_state_code * 1) === (this.stateCode * 1)) {
        console.log('v',i.lgd_state_code)
        console.log('s',this.stateCode)
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: 'State Code is already exist,Please Update'
        });
        this.stateCode = null;
      }
    })
}

  onView() {
    this.loading = true;
    this.restAPIService.get(PathConstants.FciStateMaster_GET).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.fcistateData = res;
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
    'lgd_state_name_en': this.lgdstateName,
    'state_name_ll': this.stateName,
    'lgd_state_code': this.stateCode,
    'active': this.Active
  };
  this.restAPIService.post(PathConstants.FciStateMaster_POST, params).subscribe(res => {
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
    this.fcistateData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.fcistateData = this.FilteredArray.filter(item => {
        return item.lgd_state_name_en.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.fcistateData = this.FilteredArray;
    }
  }

  onRow(event, selectedRow) {
    this.lgdstateName = selectedRow.lgd_state_name_en;
    this.stateName  = selectedRow.state_name_ll;
    this.Active = selectedRow.active;
    this.stateCode = selectedRow.lgd_state_code;
  }

  onCheckDcode() {
    console.log('1')
    this.fcistateData.forEach(i => {
      const stateCode = i.lgd_district_code;
      console.log('2',stateCode)
      if(this.stateCode === stateCode){
        this.messageService.clear();
      this.messageService.add({
        key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
        summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ErrorMessage
      });
      } else {

      }
    })
  }

}
