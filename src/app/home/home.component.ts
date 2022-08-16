import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RestAPIService } from '../services/restAPI.service';
import { DatePipe, LocationStrategy } from '@angular/common';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PathConstants } from '../constants/path.constants';
import { MessageService } from 'primeng/api';
import { StatusMessage } from '../constants/Messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date: any;
  canShowMenu: boolean;
  notifications: any;
  errMessage: string;
  godownCount: any;
  mrmCount: any;
  aadsCount: any;
  fciCount: any;
  regionCount: any;
  shopsCount: any;
  hullingAgencies: any;
  suppliersCount: any;
  schemeCount: any;
  gunnyCount: any;
  typeCount: any;
  transactionCount: any;
  vehicleCount: any;
  railyardCount: any;
  packingCount: any;
  weighmentCount: any;
  cerealCount: any;
  nonCerealCount: any;
  depositorCount: any;
  commodityCount: any;
  schemeCommodityCount: any;
  allotmentQuantityCount: any;
  options: any;
  display: boolean = false;
  notificationsHeight: any;
  noti: any;
  NotificationsData: any;
  TNCSCKey: string = 'Notification';
  imgUrl = "../../assets/NotificationPopup/";
  imgPost = "";
  NotificationNotes: any;
  @ViewChild('AADS', { static: false }) divAADS: ElementRef;
  @ViewChild('element', { static: false }) toastObj;


  constructor(private authService: AuthService, private restApiService: RestAPIService, private datePipe: DatePipe,
    private router: Router, private locationStrategy: LocationStrategy, private messageService: MessageService) { }

  ngOnInit() {
    this.showDialog();
    this.preventBackButton();
    this.canShowMenu = (this.authService.isLoggedIn()) ? this.authService.isLoggedIn() : false;
    this.date = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    let params = new HttpParams().set('Date', this.date);
    this.restApiService.get(PathConstants.DASHBOARD).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.godownCount = (res[0] !== undefined && res[0] !== '') ? res[0] : 0;
        this.mrmCount = (res[1] !== undefined && res[1] !== '') ? res[1] : 0;
        this.aadsCount = (res[2] !== undefined && res[2] !== '') ? res[2] : 0;
        this.fciCount = (res[3] !== undefined && res[3] !== '') ? res[3] : 0;
        this.regionCount = (res[4] !== undefined && res[4] !== '') ? res[4] : 0;
        this.shopsCount = (res[5] !== undefined && res[5] !== '') ? res[5] : 0;
        this.hullingAgencies = (res[6] !== undefined && res[6] !== '') ? res[6] : 0;
        this.suppliersCount = (res[7] !== undefined && res[7] !== '') ? res[7] : 0;
        this.schemeCount = (res[8] !== undefined && res[8] !== '') ? res[8] : 0;
        this.schemeCommodityCount = (res[9] !== undefined && res[9] !== '') ? res[9] : 0;
        this.commodityCount = (res[10] !== undefined && res[10] !== '') ? res[10] : 0;
        this.depositorCount = (res[11] !== undefined && res[11] !== '') ? res[11] : 0;
        this.typeCount = (res[12] !== undefined && res[12] !== '') ? res[12] : 0;
        this.transactionCount = (res[13] !== undefined && res[13] !== '') ? res[13] : 0;
        this.vehicleCount = (res[14] !== undefined && res[14] !== '') ? res[14] : 0;
        this.railyardCount = (res[15] !== undefined && res[15] !== '') ? res[15] : 0;
        this.weighmentCount = (res[16] !== undefined && res[16] !== '') ? res[16] : 0;
        this.packingCount = (res[17] !== undefined && res[17] !== '') ? res[17] : 0;
        this.gunnyCount = (res[18] !== undefined && res[18] !== '') ? res[18] : 0;
        this.allotmentQuantityCount = (res[19] !== undefined && res[19] !== '') ? res[19] : 0;
        this.cerealCount = (res[20] !== undefined && res[20] !== '') ? res[20] : 0;
        this.nonCerealCount = (res[21] !== undefined && res[21] !== '') ? res[21] : 221;
      } else {
        this.messageService.clear();
        this.messageService.add({ key: 't-err', severity: StatusMessage.SEVERITY_WARNING,
         summary: StatusMessage.SUMMARY_WARNING, detail: StatusMessage.DashboardNoRecord });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({ key: 't-err', severity: StatusMessage.SEVERITY_ERROR, summary: StatusMessage.SUMMARY_ERROR,
         detail: StatusMessage.ErrorMessage });
      }
    });
  }

  onGridClicked(param) {
    switch (param) {
      case 'godown':
        this.router.navigate(['GodownMaster']);
        break;
      case 'mrm':
        this.router.navigate(['MrmData']);
        break;
      case 'shops':
        this.router.navigate(['IssuerMaster']);
        break;
      case 'aads':
        this.router.navigate(['AADS']);
        break;
      case 'fci':
        this.router.navigate(['FciData']);
        break;
      case 'regions':
        this.router.navigate(['RegionMaster']);
        break;
      case 'hullingAgencies':
        this.router.navigate(['HullingAgencies']);
        break;
      case 'supplier':
        this.router.navigate(['SuppliersData']);
        break;
      case 'gunny':
        this.router.navigate(['GunnyType']);
        break;
      case 'schemes':
        this.router.navigate(['SchemeMaster']);
        break;
      case 'type':
        this.router.navigate(['TypeMaster']);
        break;
      case 'transaction':
        this.router.navigate(['TransactionMaster']);
        break;
      case 'vehicle':
        this.router.navigate(['VehicleMaster']);
        break;
      case 'railyard':
        this.router.navigate(['RailwayYardMaster']);
        break;
      case 'packing':
        this.router.navigate(['PackingMaster']);
        break;
      case 'weighment':
        this.router.navigate(['WeighmentMaster']);
        break;
      case 'cereal':
        this.router.navigate(['CerealNoncereal']);
        break;
      case 'depositor':
        this.router.navigate(['DepositorMaster']);
        break;
      case 'commodity':
        this.router.navigate(['CommodityMaster']);
        break;
      case 'schemeCommodity':
        this.router.navigate(['SchemeCommodityMaster']);
        break;
      case 'stackCard':
        this.router.navigate(['StackCardUpdate']);
        break;
      case 'allotmentQuantity':
        this.router.navigate(['AllotmentQuantity']);
        break;
        case 'menuMaster':
        this.router.navigate(['MenuMaster']);
        break;
        case 'userMaster':
        this.router.navigate(['UserMaster']);
        break;
    }
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  showDialog() {
    const param = { 'Type': 1 };
    this.restApiService.getByParameters(PathConstants.NOTIFICATIONS, param).subscribe(res => {
      if (res !== undefined && res !== null && res.length !== 0) {
        this.NotificationsData = res[0];
        this.NotificationNotes = this.NotificationsData.Notes;
        this.imgPost = this.imgUrl + this.NotificationsData.ImageName;
      }
    });
    const params = { 'sValue': this.TNCSCKey };
    this.restApiService.getByParameters(PathConstants.TNCSC_SETTINGS, params).subscribe(res => {
      if (res !== undefined) {
        this.noti = res[0];
        if (this.noti.TNCSCValue === 'NO') {
          this.display = false;
        }
        if (this.noti.TNCSCValue === 'YES') {
          this.display = true;
        }
      }
    });
  }
}
