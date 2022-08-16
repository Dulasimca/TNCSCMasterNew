import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { MessageService, SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-packing-master',
  templateUrl: './packing-master.component.html',
  styleUrls: ['./packing-master.component.css']
})
export class PackingMasterComponent implements OnInit {
  PackingMasterData: any;
  PackingMasterCols: any;
  FilteredArray: any = [];
  PackingData: any;
  PackingCode: any;
  PackingName: any;
  PackingType: any;
  PackingWeight: any;
  MeasurementOptions: SelectItem[];
  Measurement: any;
  Active: any;
  DeleteFlag: any;
  Packing: any;
  NewCode: any;
  RCode: any;
  searchText: any;
  GCode: any;
  canShowMenu: boolean;
  loading: boolean;
  isAdd: boolean = false;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  @ViewChild('measurement', { static: false }) measurementPanel: Dropdown;


  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
    this.loading = true;
    const params = {
      'Type': '1'
    };
    this.restAPIService.getByParameters(PathConstants.PACKING_MASTER_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.NewCode = 'P' + '0' + (res.length + 1);
        this.PackingMasterCols = this.tableConstants.PackingMaster;
        this.PackingMasterData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.PackingMasterData.forEach(ss => {
          sno += 1;
          ss.SlNo = sno;
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

  onSelect(item, type) {
    let MeasurementSelection = [];
    switch (item) {
      case 'measurement':
        if (type === 'enter') {
          this.measurementPanel.overlayVisible = true;
        }
        MeasurementSelection.push({ 'label': 'GRAMS', 'value': 'GRAMS' }, { 'label': 'KGS', 'value': 'KGS' }, { 'label': 'KILOLITRE', 'value': 'KILOLITRE' }, { 'label': 'LTRS', 'value': 'LTRS' }, { 'label': 'M.TONS', 'value': 'M.TONS' }, { 'label': 'NO.s', 'value': 'NO.s' }, { 'label': 'QUINTAL', 'value': 'QUINTAL' });
        this.MeasurementOptions = MeasurementSelection;
        this.MeasurementOptions.unshift({ 'label': '-select-', 'value': null, disabled: true });
        break;
    }
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.PackingCode = selectedRow.Pcode;
    this.Packing = selectedRow.Pcode;
    this.PackingName = selectedRow.PName;
    this.PackingWeight = selectedRow.PWeight;
    this.MeasurementOptions = [{ label: selectedRow.PBWeight, value: selectedRow.PBWeight }];
    this.Measurement = selectedRow.PBWeight;
    this.PackingType = selectedRow.Measurement;
    this.Active = selectedRow.Activeflag;
    this.DeleteFlag = selectedRow.DeleteFlag;
  }

  onAdd() {
    this.isAdd = true;
    this.isEdited = false;
    this.MeasurementOptions = undefined;
    this.PackingCode = this.Packing = this.PackingName = this.PackingWeight = this.PackingType = this.Measurement = undefined;
    this.PackingCode = this.NewCode;
    this.Active = false;
  }

  onSave() {
    const params = {
      'Pcode': this.Packing || '',
      'PName': this.PackingName,
      'PWeight': this.PackingWeight,
      'PBWeight': this.Measurement,
      'DeleteFlag': this.DeleteFlag || 'F',
      'Activeflag': this.Active,
    };
    this.restAPIService.post(PathConstants.PACKING_MASTER_POST, params).subscribe(res => {
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
    const params = {
      'Type': '1'
    };
    this.restAPIService.getByParameters(PathConstants.PACKING_MASTER_GET, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.NewCode = 'P' + '0' + (res.length + 1);
        this.PackingMasterCols = this.tableConstants.PackingMaster;
        this.PackingMasterData = res;
        this.FilteredArray = res;
        let sno = 0;
        this.PackingMasterData.forEach(ss => {
          sno += 1;
          ss.SlNo = sno;
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
    this.PackingMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.PackingMasterData = this.FilteredArray.filter(item => {
        return item.PName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.PackingMasterData = this.FilteredArray;
    }
  }

  onClear() {
    this.MeasurementOptions = undefined;
    this.PackingCode = this.Packing = this.NewCode = this.PackingName = this.PackingWeight = this.PackingType = this.Measurement = undefined;
    this.Active = false;
    this.isEdited = false;
  }
}