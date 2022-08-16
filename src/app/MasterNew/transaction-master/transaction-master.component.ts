import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { TableConstants } from 'src/app/constants/table.constants';
import { PathConstants } from 'src/app/constants/path.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaction-master',
  templateUrl: './transaction-master.component.html',
  styleUrls: ['./transaction-master.component.css']
})
export class TransactionMasterComponent implements OnInit {
  TransactionMasterData: any;
  TransactionMasterCols: any;
  FilteredArray: any = [];
  TransactionData: any;
  TransactionCode: any;
  TransactionName: any;
  TransactionType: any;
  Active: any;
  searchText: any;
  DeleteFlag: any;
  TransactionOptions: SelectItem[];
  Transaction: any;
  NewCode: any;
  TRCode: any;
  RCode: any;
  GCode: any;
  canShowMenu: boolean;
  loading: boolean;
  isAdd: boolean = false;
  viewPane: boolean = false;
  isViewed: boolean = false;
  isEdited: boolean = false;
  // @ViewChild('Type', { static: false }) TypePanel: Dropdown;
  @ViewChild('transaction', { static: false }) transactionPanel: Dropdown;



  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService, private tableConstants: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.RCode = this.authService.getUserAccessible().rCode;
    this.GCode = this.authService.getUserAccessible().gCode;
    this.loading = true;
    const params = {
      'Type': '1'
    };
    this.restAPIService.getByParameters(PathConstants.TRANSACTION_MASTER_GET, params).subscribe(res => {
      if (res !== undefined) {
        this.NewCode = 'TR' + '0' + (res.length + 1);
        this.TransactionMasterCols = this.tableConstants.TransactionMaster;
        this.TransactionMasterData = res;
        this.FilteredArray = res;
        this.TransactionMasterData.forEach(s => {
          if (s.TransType === 'R') {
            return s.TransactionTY = 'Receipt';
          } else if (s.TransType === 'I') {
            return s.TransactionTY = 'Issue';
          }
        });
        let sno = 0;
        this.TransactionMasterData.forEach(ss => {
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
    let TransactionSelection = [];
    let transaction = [];
    transaction = this.FilteredArray;
    switch (item) {
      case 'transaction':
        if (type === 'enter') {
          this.transactionPanel.overlayVisible = true;
        }
        if (transaction !== undefined && transaction !== null && transaction.length !== 0) {
          var uniqueArray = Array.from(new Set(transaction.map((item: any) => item.TransType)));
          for (var index in uniqueArray) {
            var code = uniqueArray[index];
            let i = transaction.findIndex(cd => cd.TransType === code);
            TransactionSelection.push({ 'label': transaction[i].TransactionTY, 'value': code });
          }
          this.TransactionOptions = TransactionSelection;
          this.TransactionOptions.unshift({ label: '-select', value: null });
        } else {
          this.TransactionOptions = TransactionSelection;
        }
    }
  }

  onRow(event, selectedRow) {
    this.isEdited = true;
    this.isViewed = false;
    this.TransactionCode = selectedRow.TRCode;
    this.Transaction = selectedRow.TRCode;
    this.TransactionName = selectedRow.TRName;
    this.TransactionOptions = [{ label: selectedRow.TransactionTY, value: selectedRow.TransType }];
    this.TransactionType = selectedRow.TransType;
    this.TRCode = selectedRow.TransactionTY;
    this.Active = selectedRow.Activeflag;
    this.DeleteFlag = selectedRow.DeleteFlag;
  }

  onAdd() {
    this.isAdd = true;
    this.isEdited = false;
    this.TransactionCode = this.NewCode;
    this.TransactionName = this.Transaction = this.TransactionType = undefined;
    this.TransactionOptions = undefined;
    this.Active = false;
  }

  onSave() {
    const params = {
      'TRCode': this.Transaction || '',
      'TRName': this.TransactionName,
      'TransType': this.TransactionType,
      'DeleteFlag': this.DeleteFlag || 'F',
      'Activeflag': this.Active,
    };
    this.restAPIService.post(PathConstants.TRANSACTION_MASTER_POST, params).subscribe(res => {
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
    this.restAPIService.getByParameters(PathConstants.TRANSACTION_MASTER_GET, params).subscribe(res => {
      if (res !== undefined) {
        this.NewCode = 'TR' + '0' + (res.length + 1);
        this.TransactionMasterCols = this.tableConstants.TransactionMaster;
        this.TransactionMasterData = res;
        this.FilteredArray = res;
        this.TransactionMasterData.forEach(s => {
          if (s.TransType === 'R') {
            return s.TransactionTY = 'Receipt';
          } else if (s.TransType === 'I') {
            return s.TransactionTY = 'Issue';
          }
        });
        let sno = 0;
        this.TransactionMasterData.forEach(ss => {
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
    this.TransactionMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.TransactionMasterData = this.FilteredArray.filter(item => {
        return item.TRName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.TransactionMasterData = this.FilteredArray;
    }
  }

  onClear() {
    this.TransactionMasterData = this.TransactionMasterCols = this.TransactionOptions = undefined;
    this.TransactionName = this.TransactionCode = this.TransactionType = this.Active = null;
    this.isEdited = false;
  }
}