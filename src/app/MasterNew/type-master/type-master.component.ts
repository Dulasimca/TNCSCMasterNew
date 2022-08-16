import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';
import { TableConstants } from 'src/app/constants/table.constants';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-type-master',
  templateUrl: './type-master.component.html',
  styleUrls: ['./type-master.component.css']
})
export class TypeMasterComponent implements OnInit {
  TypeMasterData: any;
  TypeMasterCols: any;
  FilteredArray: any = [];
  TypeData: any;
  TypeCode: any;
  TypeName: any;
  TypeTransaction: any;
  Active: any;
  DeleteFlag: any;
  TypeOptions: SelectItem[];
  Type: any;
  NewCode: any;
  TRCode: any;
  RCode: any;
  searchText: any;
  GCode: any;
  canShowMenu: boolean;
  loading: boolean;
  isAdd: boolean = false;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  // @ViewChild('Type', { static: false }) TypePanel: Dropdown;
  @ViewChild('type', {static: false}) typePanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
    this.loading = true;
    const params = {
      'TRCode': 'D'
    };
    this.restAPIService.getByParameters(PathConstants.DEPOSITOR_TYPE_MASTER, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.NewCode = 'TY' + '0' + (res.length + 1);
        this.TypeMasterCols = this.tableConstants.TypeMaster;
        this.TypeMasterData = res;
        this.FilteredArray = res;
        this.TypeMasterData.forEach(s => {
          if (s.TYTransaction === 'D') {
            return s.TypeTran = 'Depositor Transaction';
          } else if (s.TYTransaction === 'I') {
            return s.TypeTran = 'Issue Transaction';
          } else if (s.TYTransaction === 'TR') {
            return s.TypeTran = 'Transfer Transaction';
          }
        });
        let sno = 0;
        this.TypeMasterData.forEach(ss => {
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
    let TypeSelection = [];
    let typee = [];
    typee = this.FilteredArray;
    switch (item) {
      case 'type':
        if (type === 'enter') {
          this.typePanel.overlayVisible = true;
        }
        if (typee !== undefined && typee !== null && typee.length !== 0) {
          var uniqueArray = Array.from(new Set(typee.map((item: any) => item.TYTransaction)));
          for (var index in uniqueArray) {
            var code = uniqueArray[index];
            let i = typee.findIndex(cd => cd.TYTransaction === code);
            TypeSelection.push({ 'label': typee[i].TypeTran, 'value': code });
          }
          this.TypeOptions = TypeSelection;
          this.TypeOptions.unshift({ label: '-select', value: null });
        } else {
          this.TypeOptions = TypeSelection;
        }
    }
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.TypeCode = selectedRow.Tycode;
    this.Type = selectedRow.Tycode;
    this.TypeName = selectedRow.Tyname;
    this.TypeOptions = [{ label: selectedRow.TypeTran, value: selectedRow.TYTransaction }];
    this.TypeTransaction = selectedRow.TYTransaction;
    this.TRCode = selectedRow.TypeTran;
    this.Active = selectedRow.Activeflag;
    this.DeleteFlag = selectedRow.DeleteFlag;
  }

  onAdd() {
    this.isAdd = true;
    this.isEdited = false;
    this.TypeCode = this.Type = this.TypeName = undefined;
    this.TypeCode = this.NewCode;
    this.TypeOptions = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'Tycode': this.Type || '',
      'Tyname': this.TypeName,
      'TYTransaction': this.TypeTransaction,
      'DeleteFlag': this.DeleteFlag || 'F',
      'Activeflag': this.Active,
    };
    this.restAPIService.post(PathConstants.TYPE_MASTER_POST, params).subscribe(res => {
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
      'TRCode': 'D'
    };
    this.restAPIService.getByParameters(PathConstants.DEPOSITOR_TYPE_MASTER, params).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.NewCode = 'TY' + '0' + (res.length + 1);
        this.TypeMasterCols = this.tableConstants.TypeMaster;
        this.TypeMasterData = res;
        this.FilteredArray = res;
        this.TypeMasterData.forEach(s => {
          if (s.TYTransaction === 'D') {
            return s.TypeTran = 'Depositor Transaction';
          } else if (s.TYTransaction === 'I') {
            return s.TypeTran = 'Issue Transaction';
          } else if (s.TYTransaction === 'TR') {
            return s.TypeTran = 'Transfer Transaction';
          }
        });
        let sno = 0;
        this.TypeMasterData.forEach(ss => {
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
    this.TypeMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.TypeMasterData = this.FilteredArray.filter(item => {
        return item.Tyname.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.TypeMasterData = this.FilteredArray;
    }
  }

  onClear() {
    this.TypeMasterData = this.TypeMasterCols =  this.TypeOptions = undefined;
    this.TypeName = this.TypeCode = this.TypeTransaction = this.Type = this.NewCode = this.Active = null;
    this.isEdited = false;
  }
}