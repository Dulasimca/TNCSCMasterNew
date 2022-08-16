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
  selector: 'app-commodity-master',
  templateUrl: './commodity-master.component.html',
  styleUrls: ['./commodity-master.component.css']
})
export class CommodityMasterComponent implements OnInit {
  ItemMasterData: any;
  ItemMasterCols: any;
  FilteredArray: any = [];
  AllotmentGroupData: any = [];
  PristineData: any;
  ItemData: any;
  ItemCode: any;
  ItemName: any;
  ItemType: any;
  Active: any;
  DeleteFlag: any;
  ItemOptions: SelectItem[];
  AllotmentOptions: SelectItem[];
  MeasurementOptions: SelectItem[];
  groupOptions: SelectItem[];
  Measurement: any;
  AllotmentGroup: any;
  Item: any;
  ITTax: any;
  GRName: any;
  MajorCode: any;
  SFlag: boolean;
  CBFlag: boolean;
  Unit: any;
  Group: any;
  GroupId: any;
  Allotmentgroup: any;
  ITBweighment: any;
  NewCode: any;
  Hsncode: any;
  TRCode: any;
  RCode: any;
  GCode: any;
  canShowMenu: boolean;
  loading: boolean;
  searchText: any;
  isAdd: boolean = false;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  @ViewChild('measurement', { static: false }) measurementPanel: Dropdown;
  @ViewChild('allotment', { static: false }) allotmentPanel: Dropdown;
  @ViewChild('item', { static: false }) itemPanel: Dropdown;
  @ViewChild('group', { static: false }) groupPanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
    this.loading = true;
    const params = {
      'ItemType': '1'
    };
    this.restAPIService.getByParameters(PathConstants.ITEM_MASTER_GET, params).subscribe(res => {
      if (res !== undefined) {
        // this.NewCode = 'IT' + (res.length + 1);
        // this.NewCode = res.filter(x => { return x.ITCode });
        let New = [];
        this.NewCode = res;
        this.NewCode.forEach(s => {
          New.push(s.ITCode);
          New.sort();
        });
        New = res.sort(res.ITCode);
        this.NewCode = New;
        // this.NewCode = this.NewCode.split(/(\d+)/).filter(Boolean);
        // this.FilteredArray = Math.max(this.NewCode);

        // this.NewCode = New;
        // this.NewCode = res.sort(res.ITCode);
        // this.NewCode = Math.max(this.NewCode);
        // this.NewCode = this.NewCode.split(/(\d+)/).filter(Boolean);
        this.ItemMasterCols = this.tableConstants.CommodityMasterCols;
        this.ItemMasterData = res;
        this.FilteredArray = res;
        this.ItemMasterData.forEach(s => {
          if (s.Grouping === 1) {
            s.GroupName = 'Commodity';
          } else if (s.Grouping === 2) {
            s.GroupName = 'Other';
          } else if (s.Grouping === 3) {
            s.GroupName = 'Gunny';
          }
          (s.ItemType === 'C') ? s.ItemName = 'Cereal' : s.ItemName = 'Non-Cereal';
        });
        // this.NewCode = 'IT' + res.length + 1;
        let sno = 0;
        this.ItemMasterData.forEach(ss => {
          sno += 1;
          ss.SlNo = sno;
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
    this.onClear();
  }

  onSelect(item, type) {
    let ItemSelection = [];
    let MeasurementSelection = [];
    let AllotmentSelection = [];
    let GroupingSelection = [];
    let Cereal = [];
    Cereal = this.FilteredArray;
    switch (item) {
      case 'item':
        if (type === 'enter') {
          this.itemPanel.overlayVisible = true;
        }
        if (Cereal !== undefined && Cereal !== null && Cereal.length !== 0) {
          var uniqueArray = Array.from(new Set(Cereal.map((item: any) => item.ItemType)));
          for (var index in uniqueArray) {
            var code = uniqueArray[index];
            let i = Cereal.findIndex(cd => cd.ItemType === code);
            ItemSelection.push({ 'label': Cereal[i].ItemName, 'value': code });
          }
          this.ItemOptions = ItemSelection;
          this.ItemOptions.unshift({ label: '-select', value: null });
        } else {
          this.ItemOptions = ItemSelection;
        }
        break;
      case 'measurement':
        if (type === 'enter') {
          this.measurementPanel.overlayVisible = true;
        }
        MeasurementSelection.push({ label: '-select-', value: null, disabled: true }, { label: 'GRAMS', value: 'GRAMS' },
          { label: 'KGS', value: 'KGS' }, { label: 'KILOLITRE', value: 'KILOLITRE' }, { label: 'LTRS', value: 'LTRS' },
          { label: 'M.TONS', value: 'M.TONS' }, { label: 'NO.s', value: 'NO.s' }, { label: 'QUINTAL', value: 'QUINTAL' });
        this.MeasurementOptions = MeasurementSelection;
        break;
      case 'group':
        if (type === 'enter') {
          this.groupPanel.overlayVisible = true;
        }
        GroupingSelection.push({ label: '-select-', value: null, disabled: true }, { label: 'Commodity', value: 1 },
          { label: 'Gunny', value: 3 }, { label: 'Other', value: 2 });
        this.groupOptions = GroupingSelection;
        break;
      case 'allotment':
        if (type === 'enter') {
          this.allotmentPanel.overlayVisible = true;
        }
        this.restAPIService.get(PathConstants.MAJOR_ITEM_MASTER).subscribe(res => {
          if (res !== undefined && res !== null && res.length !== 0) {
            this.AllotmentGroupData = res;
            this.AllotmentGroupData.forEach(S => {
              AllotmentSelection.push({ 'label': S.MajorName, 'value': S.MajorCode });
            });
            this.AllotmentOptions = AllotmentSelection;
            this.AllotmentOptions.unshift({ 'label': '-select-', 'value': null, disabled: true });
          }
        });
    }
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.ItemCode = selectedRow.ITCode;
    this.Item = selectedRow.ITCode;
    this.ItemName = selectedRow.ITDescription;
    this.ItemOptions = [{ label: selectedRow.ItemName, value: selectedRow.ItemType }];
    this.MeasurementOptions = [{ label: selectedRow.ITBweighment, value: selectedRow.Measurement }];
    this.AllotmentOptions = [{ label: selectedRow.MajorName, value: selectedRow.GRName }];
    this.groupOptions = [{ label: selectedRow.GroupName, value: selectedRow.Grouping }];
    this.ItemType = selectedRow.ItemType;
    this.Hsncode = selectedRow.Hsncode;
    this.TRCode = selectedRow.ItemName;
    this.Measurement = selectedRow.ITBweighment;
    this.Active = selectedRow.Activeflag;
    this.DeleteFlag = selectedRow.DeleteFlag;
    this.ITTax = selectedRow.ittax;
    this.GRName = selectedRow.MajorName;
    this.MajorCode = selectedRow.GRName;
    this.SFlag = selectedRow.SFlag;
    this.CBFlag = selectedRow.CBFlag;
    this.Unit = selectedRow.Unit;
    this.AllotmentGroup = selectedRow.MajorName;
    this.Group = selectedRow.GroupName;
    this.GroupId = selectedRow.Grouping;
  }

  onAdd() {
    this.isAdd = true;
    this.isEdited = false;
    this.ItemName = this.ItemCode = this.Item = this.Group = this.ITTax = this.DeleteFlag = this.SFlag = this.CBFlag = this.Unit = this.Measurement = this.AllotmentGroup = this.ItemType = this.Hsncode = undefined;
    // this.ItemCode = this.NewCode;
    // for (var i = 0; i < this.NewCode.length; i++) {
    //   Math.max(this.NewCode);
    // }
    // this.ItemCode = i;
    this.ItemOptions = this.AllotmentOptions = this.MeasurementOptions = this.groupOptions = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'ITCode': this.Item || '',
      'ITDescription': this.ItemName,
      'ITBweighment': this.Measurement,
      'ittax': this.ITTax,
      'GRName': this.AllotmentGroup.value || this.MajorCode,
      'ItemType': this.ItemType,
      'Hsncode': this.Hsncode,
      'DeleteFlag': this.DeleteFlag || 'F',
      'ActiveFlag': this.Active,
      'Allotmentgroup': this.AllotmentGroup.label || this.AllotmentGroup,
      'SFlag': this.SFlag || true,
      'CBFlag': this.CBFlag || true,
      'Unit': this.Unit || this.Measurement,
      'Group': this.Group.value || this.GroupId
    };
    this.restAPIService.post(PathConstants.COMMODITY_MASTER_POST, params).subscribe(res => {
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
      'ItemType': '1'
    };
    this.restAPIService.getByParameters(PathConstants.ITEM_MASTER_GET, params).subscribe(res => {
      if (res !== undefined) {
        this.ItemMasterCols = this.tableConstants.CommodityMasterCols;
        this.ItemMasterData = res;
        this.FilteredArray = res;
        this.NewCode = 'IT' + (res.length + 1);
        this.ItemMasterData.forEach(s => {
          if (s.Grouping === 1) {
            s.GroupName = 'Commodity';
          } else if (s.Grouping === 2) {
            s.GroupName = 'Other';
          } else if (s.Grouping === 3) {
            s.GroupName = 'Gunny';
          }
          (s.ItemType === 'C') ? s.ItemName = 'Cereal' : s.ItemName = 'Non-Cereal';
        });
        let sno = 0;
        this.ItemMasterData.forEach(ss => {
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
    this.ItemMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.ItemMasterData = this.FilteredArray.filter(item => {
        return item.ITDescription.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.ItemMasterData = this.FilteredArray;
    }
  }

  onClear() {
    this.ItemMasterData = this.ItemMasterCols = this.groupOptions = this.AllotmentOptions = this.MeasurementOptions = this.ItemOptions = undefined;
    this.ItemName = this.ItemCode = this.Group = this.ITTax = this.DeleteFlag = this.SFlag = this.CBFlag = this.Unit = this.Active = this.ItemType = this.NewCode = this.Item = this.Hsncode = this.Measurement = this.AllotmentGroup = null;
    this.isEdited = false;
  }
}
