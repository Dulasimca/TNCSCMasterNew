import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { MessageService } from 'primeng/api';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-scheme-commodity-master',
  templateUrl: './scheme-commodity-master.component.html',
  styleUrls: ['./scheme-commodity-master.component.css']
})
export class SchemeCommodityMasterComponent implements OnInit {
  SchemeCommodityMasterData: any;
  SchemeCommodityMasterCols: any;
  SchemeCommodityData: any;
  AllSchemeData: any;
  CommodityData: any;
  FilteredArray: any;
  SchemeCommodityCode: any;
  SchemeCommodityName: any;
  Active: any;
  DeleteFlag: any;
  SchemeCommodityOptions: SelectItem[];
  CommodityOptions: SelectItem[];
  SchemeCommodity: any;
  SchemeCode: any;
  SchemeName: any;
  RCode: any;
  GCode: any;
  RowID: any;
  NewRow: any;
  isAdd: boolean = false;
  Add: boolean = false;
  canShowMenu: boolean;
  searchText: any;
  loading: boolean;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  @ViewChild('schemeCommodity', { static: false }) schemeCommodityPanel: Dropdown;
  @ViewChild('commodity', { static: false }) commodityPanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService,
    private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
  }

  onSelect(item, type) {
    let schemeCommoditySelection = [];
    let commoditySelection = [];
    switch (item) {
      case 'schemeCommodity':
        if (type === 'enter') {
          this.schemeCommodityPanel.overlayVisible = true;
        }
        if (this.SchemeCommodityOptions === undefined) {
          this.restAPIService.get(PathConstants.SCHEME_MASTER).subscribe(res => {
            if (res !== undefined) {
              this.SchemeCommodity = res;
              this.SchemeCommodity.forEach(data => {
                schemeCommoditySelection.push({ 'label': data.Name, 'value': data.SCCode });
              });
              this.SchemeCommodityOptions = schemeCommoditySelection;
            }
          });
        }
        break;
      case 'commodity':
        if (type === 'enter') {
          this.commodityPanel.overlayVisible = true;
        }
        this.restAPIService.get(PathConstants.ITEM_MASTER).subscribe(res => {
          if (res !== undefined) {
            this.CommodityData = res;
            this.CommodityData.forEach(data => {
              commoditySelection.push({ 'label': data.ITDescription, 'value': data.ITCode });
            });
            this.CommodityOptions = commoditySelection;
          }
        });
        break;
    }
  }

  onView() {
    this.loading = true;
    const params = {
      'SCCode': this.SchemeCommodity.value
    };
    this.restAPIService.getByParameters(PathConstants.SCHEME_COMMODITY_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.SchemeCommodityMasterCols = this.tableConstants.SchemeCommodityMaster;
        this.SchemeCommodityMasterData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.SchemeCommodityMasterData.forEach(value => {
          sno += 1;
          value.SlNo = sno;
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

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.SchemeCode = selectedRow.SchemeCode;
    this.SchemeName = selectedRow.SchemeName;
    this.CommodityOptions = [{ label: selectedRow.CommodityName, value: selectedRow.ITCode }];
    this.SchemeCommodityName = selectedRow.ITCode;
    this.SchemeCommodityCode = selectedRow.CommodityName;
    this.RowID = selectedRow.RowId;
    this.Active = selectedRow.ActiveFlag;
    this.DeleteFlag = selectedRow.DeleteFlag;
  }

  onAdd() {
    this.isAdd = true;
    this.isEdited = true;
    this.SchemeCode = this.SchemeCommodity.value;
    this.SchemeName = this.SchemeCommodity.label;
    this.SchemeCommodityCode = this.RowID = this.DeleteFlag = this.SchemeCommodityName = undefined;
    this.CommodityOptions = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'RowId': this.RowID || '',
      'SCCode': this.SchemeCode || this.SchemeCommodity.value,
      'CCode': this.SchemeCommodityName,
      'DeleteFlag': this.DeleteFlag || 'F',
      'ActiveFlag': this.Active,
    };
    this.restAPIService.post(PathConstants.SCHEME_COMMODITY_POST, params).subscribe(res => {
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
  }


  onSearch(value) {
    this.SchemeCommodityMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.SchemeCommodityMasterData = this.FilteredArray.filter(item => {
        return item.CommodityName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.SchemeCommodityMasterData = this.FilteredArray;
    }
  }

  onReset(item) {
    if (item === 'schemeCommodity') {
      this.onClear();
    }
  }

  onClear() {
    this.SchemeCommodityMasterData = this.SchemeCommodityMasterCols = this.CommodityOptions = undefined;
    this.SchemeCommodityName = this.SchemeCode = this.Active = null;
    this.isEdited = false;
  }
}