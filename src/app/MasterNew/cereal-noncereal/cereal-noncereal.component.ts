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
  selector: 'app-cereal-noncereal',
  templateUrl: './cereal-noncereal.component.html',
  styleUrls: ['./cereal-noncereal.component.css']
})
export class CerealNoncerealComponent implements OnInit {
  ItemMasterData: any;
  ItemMasterCols: any;
  FilteredArray: any = [];
  ItemData: any;
  ItemCode: any;
  ItemName: any;
  ItemType: any;
  Active: any;
  DeleteFlag: any;
  ItemOptions: SelectItem[];
  Item: any;
  TRCode: any;
  searchText: any;
  RCode: any;
  GCode: any;
  canShowMenu: boolean;
  loading: boolean;
  isAdd: boolean = false;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  @ViewChild('item', { static: false }) itemPanel: Dropdown;


  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
    this.loading = true;
    this.restAPIService.get(PathConstants.ITEM_MASTER).subscribe(res => {
      if (res !== undefined) {
        this.ItemMasterCols = this.tableConstants.CerealNonCerealItemMaster;
        this.ItemMasterData = res;
        this.FilteredArray = res;
        this.ItemMasterData.forEach(s => {
          if (s.ItemType === 'C') {
            return s.ItemName = 'Cereal';
          } else if (s.ItemType === 'NC') {
            return s.ItemName = 'Non-Cereal';
          }
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

  onSelect(item, type) {
    let ItemSelection = [];
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
    }
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.ItemCode = selectedRow.ITCode;
    this.ItemName = selectedRow.ITDescription;
    this.ItemOptions = [{ label: selectedRow.ItemName, value: selectedRow.ItemType }];
    this.ItemType = selectedRow.ItemType;
    this.TRCode = selectedRow.ItemName;
  }

  onAdd() {
    this.isAdd = true;
    this.isEdited = false;
    this.ItemCode = this.ItemName = undefined;
    this.ItemOptions = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'Type': '1',
      'ITCode': this.ItemCode,
      'ITDescription': this.ItemName,
      'ItemType': this.ItemType,
    };
    this.restAPIService.post(PathConstants.CEREAL_MASTER_POST, params).subscribe(res => {
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
    this.restAPIService.get(PathConstants.ITEM_MASTER).subscribe(res => {
      if (res !== undefined) {
        this.ItemMasterCols = this.tableConstants.CerealNonCerealItemMaster;
        this.ItemMasterData = res;
        this.FilteredArray = res;
        this.ItemMasterData.forEach(s => {
          if (s.ItemType === 'C') {
            return s.ItemName = 'Cereal';
          } else if (s.ItemType === 'NC') {
            return s.ItemName = 'Non-Cereal';
          }
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
    this.ItemMasterData = this.ItemMasterCols = this.ItemOptions = undefined;
    this.ItemCode = this.ItemName = this.ItemType = null;
    this.isEdited = false;
  }
}
