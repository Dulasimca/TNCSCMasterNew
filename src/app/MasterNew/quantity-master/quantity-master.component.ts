import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestAPIService } from 'src/app/services/restAPI.service';
import { PathConstants } from 'src/app/constants/path.constants';
import { SelectItem, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/primeng';
import { TableConstants } from 'src/app/constants/table.constants';
import { StatusMessage } from 'src/app/constants/Messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quantity-master',
  templateUrl: './quantity-master.component.html',
  styleUrls: ['./quantity-master.component.css']
})
export class QuantityMasterComponent implements OnInit {
  QuantityAccountMasterCols: any;
  QuantityAccountMasterData: any;
  FilteredArray: any;
  canShowMenu: boolean;
  loading: boolean;
  searchText: any;
  ReportType: any;
  QuantityData: any;
  HeaderValue: any;
  Drop: boolean = false;
  isEdited: boolean = false;
  RTypeOptions: SelectItem[];
  HeaderOptions: SelectItem[];
  SchemeOptions: SelectItem[];
  TransactionOptions: SelectItem[];
  TransactionData: any;
  SchemeData: any;
  TransactionName: any;
  SchemeName: any;
  Active: any;
  @ViewChild('reportType', { static: false }) reportTypePanel: Dropdown;
  @ViewChild('headerValue', { static: false }) headerValuePanel: Dropdown;
  @ViewChild('transaction', { static: false }) transactionPanel: Dropdown;
  @ViewChild('scheme', { static: false }) schemePanel: Dropdown;

  constructor(private authService: AuthService, private restAPIService: RestAPIService, private messageService: MessageService,
    private tableConstant: TableConstants) { }

  ngOnInit() {
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
  }

  onSelect(item, type) {
    let ReportTypeSelection = [];
    let commoditySelection = [];
    let transactionSelection = [];
    let schemeSelection = [];
    switch (item) {
      case 'RType':
        if (type === 'enter') {
          this.reportTypePanel.overlayVisible = true;
        }
        ReportTypeSelection.push({ label: 'Commodity', value: 1 }, { label: 'Sales Commodity', value: 2 },
          { label: 'Gunny', value: 3 }, { label: 'Other', value: 4 });
        // ReportTypeSelection.unshift({ label: '-select-', value: null, disabled: true });
        this.RTypeOptions = ReportTypeSelection;
        if (this.ReportType !== undefined) {
          this.onRType();
        }
        break;
      case 'Transaction':
        if (type === 'enter') {
          this.transactionPanel.overlayVisible = true;
        }
        this.restAPIService.get(PathConstants.TRANSACTION_MASTER).subscribe(res => {
          if (res !== undefined) {
            this.TransactionData = res;
            this.TransactionData.forEach(data => {
              transactionSelection.push({ label: data.TRName, value: data.TRCode });
            });
            this.TransactionOptions = transactionSelection;
          }
        });
        break;
      case 'Scheme':
        if (type === 'enter') {
          this.schemePanel.overlayVisible = true;
        }
        this.restAPIService.get(PathConstants.SCHEME_MASTER).subscribe(res => {
          if (res !== undefined) {
            this.SchemeData = res;
            this.SchemeData.forEach(data => {
              schemeSelection.push({ label: data.Name, value: data.SCCode });
            });
            this.SchemeOptions = schemeSelection;
          }
        });
        break;
    }
  }

  onView() {
    // this.loading = true;
    const params = {
      'Type': 1,
      'ReportType': this.ReportType.value,
      'TRCode': this.TransactionName,
      'SCCode': this.SchemeName,
      'Activeflag': this.Active
    };
    this.restAPIService.getByParameters(PathConstants.QUANTITY_ACCOUNT_GET, params).subscribe(res => {
      if (res.length === 0) {
        this.onSave();
        // this.loading = false;
      } else {
        // this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
          summary: StatusMessage.SUMMARY_WARNING, detail: StatusMessage.QuantityAlreadyExists
        });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        // this.loading = false;
        this.messageService.clear();
        this.messageService.add({
          key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
          summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ErrorMessage
        });
      }
    });
  }

  onRType() {
    if (this.ReportType !== undefined) {
      let HeaderSelection = [];
      const params = {
        'ReportType': this.ReportType.value
      };
      this.restAPIService.getByParameters(PathConstants.QUANTITY_ACCOUNT_GET, params).subscribe(res => {
        // this.QuantityAccountMasterCols = this.tableConstant.QuantityAccount;
        this.QuantityAccountMasterData = res;
        this.Drop = true;
        this.QuantityAccountMasterData.forEach(HV => {
          HeaderSelection.push({ label: HV.HeaderName, value: HV.ID });
        });
        this.HeaderOptions = HeaderSelection;
      });
    }
  }

  onRow(event, selectedRow) {
    // this.isEdited = true;
  }

  onAdd() {
    this.Drop = true;
    this.isEdited = true;
  }

  onCheck() {
    const params = {
    };
  }

  onSave() {
    const params = {
      'SlNo': '',
      'ReportType': this.ReportType.value,
      'TRCode': this.TransactionName,
      'SCCode': this.SchemeName,
      'Activeflag': this.Active
    };
    this.restAPIService.post(PathConstants.QUANTITY_ACCOUNT_POST, params).subscribe(res => {
      if (res) {
        this.onClear();
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

  onClear() {
    this.TransactionName = this.SchemeName = this.Active = this.ReportType = this.HeaderValue = null;
    this.RTypeOptions = this.HeaderOptions = this.TransactionOptions = this.SchemeOptions = undefined;
    this.Drop = this.isEdited = false;
  }

  onSearch(value) {
    this.QuantityAccountMasterData = this.FilteredArray;
    if (value !== undefined && value !== '') {
      value = value.toString().toUpperCase();
      this.QuantityAccountMasterData = this.FilteredArray.filter(item => {
        return item.CommodityName.toString().toUpperCase().startsWith(value);
      });
    } else {
      this.QuantityAccountMasterData = this.FilteredArray;
    }
  }
}
