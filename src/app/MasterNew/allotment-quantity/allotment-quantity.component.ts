import { Component, OnInit, ViewChild } from '@angular/core';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService, SelectItem } from 'primeng/api';
import { PathConstants } from 'src/app/constants/path.constants';
import { TableConstants } from 'src/app/constants/table.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';
import { Dropdown } from 'primeng/primeng';

@Component({
  selector: 'app-allotment-quantity',
  templateUrl: './allotment-quantity.component.html',
  styleUrls: ['./allotment-quantity.component.css']
})
export class AllotmentQuantityComponent implements OnInit {
  allotmentCols: any;
  allotmentData: any;
  loading: boolean;
  label: string = 'Save';
  AName: any;
  ACode: any;
  AllotmentCommodity: any;
  AllotmentScheme: any;
  canShowMenu: boolean;
  FilteredArray: any;
  isSelected: boolean = false;
  SessionFlag: any;
  commodityOptions: SelectItem[];
  schemeOptions: SelectItem[];
  @ViewChild('commodity', { static: false }) commodityPanel: Dropdown;
  @ViewChild('scheme', { static: false }) schemePanel: Dropdown;

  constructor(private TableConstants: TableConstants, private restApi: RestAPIService, private authService: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.onView();
  }

  onSelect(type, id) {
    let commoditySelection = [];
    let schemeSelection = [];
    switch (id) {
      case 'com':
        if (type === 'tab') {
          this.commodityPanel.overlayVisible = true;
        }
        this.restApi.get(PathConstants.ALLOTMENT_GROUP_GET).subscribe(res => {
          if (res !== undefined && res !== null && res.length !== 0) {
            res.forEach(cm => {
              commoditySelection.push({ label: cm.AllotmentName, value: cm.AllotmentCode });
            });
            this.commodityOptions = commoditySelection;
            this.commodityOptions.unshift({ label: '-select', value: null });
          } else {
            this.commodityOptions = commoditySelection;
          }
        });
        break;
      case 'sch':
        if (type === 'tab') {
          this.schemePanel.overlayVisible = true;
        }
        this.restApi.get(PathConstants.SCHEME_MASTER).subscribe(res => {
          if (res !== undefined && res !== null && res.length !== 0) {
            res.forEach(sc => {
              schemeSelection.push({ label: sc.Name, value: sc.SCCode });
            });
            this.schemeOptions = schemeSelection;
            this.schemeOptions.unshift({ label: '-select', value: null });
          } else {
            this.schemeOptions = schemeSelection;
          }
        });
        break;
    }
  }

  onView() {
    this.restApi.get(PathConstants.ALLOTMENT_COMMODITY_GET).subscribe(res => {
      if (res !== undefined && res !== null) {
        this.allotmentCols = this.TableConstants.AllotmentCommodityCols;
        this.allotmentData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.allotmentData.forEach(S => {
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
  }

  onSave() {
    const params = {
      'ACode': this.ACode || '',
      'AName': this.AName,
      'AllotmentCommodity': this.AllotmentCommodity.label,
      'AllotmentScheme': this.AllotmentScheme.label
    };
    this.restApi.post(PathConstants.ALLOTMENT_COMMODITY_POST, params).subscribe(res => {
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

  onClear() {
    this.ACode = this.AName = this.AllotmentCommodity = this.AllotmentScheme = undefined;
  }
}