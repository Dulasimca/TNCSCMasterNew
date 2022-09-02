import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { BlockUIModule } from 'primeng/blockui';
import { ListboxModule } from 'primeng/listbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExcelService } from './services/excel.service';
import { RestAPIService } from './services/restAPI.service';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { RegionMasterComponent } from './region-master/region-master.component';
import { AppRoutingModule } from './app-routing.module';
import { GunnyTypeMasterComponent } from './gunny-type-master/gunny-type-master.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DepositorMasterComponent } from './MasterNew/depositor-master/depositor-master.component';
import { TypeMasterComponent } from './MasterNew/type-master/type-master.component';
import { TransactionMasterComponent } from './MasterNew/transaction-master/transaction-master.component';
import { CerealNoncerealComponent } from './MasterNew/cereal-noncereal/cereal-noncereal.component';
import { CommodityMasterComponent } from './MasterNew/commodity-master/commodity-master.component';
import { MenubarModule } from 'primeng/menubar';
import {InputMaskModule} from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { TableConstants } from './constants/table.constants';
import { StatusMessage } from './constants/Messages';
import { LoginService } from './login/login.service';
import { DatePipe } from '@angular/common';
import { PathConstants } from './constants/path.constants';
import { RoleBasedService } from './shared/role-based.service';
import { VehicleMasterComponent } from './MasterNew/vehicle-master/vehicle-master.component';
import { WeighmentMasterComponent } from './MasterNew/weighment-master/weighment-master.component';
import { RailYardMasterComponent } from './MasterNew/rail-yard-master/rail-yard-master.component';
import { SchemeMasterComponent } from './MasterNew/scheme-master/scheme-master.component';
import { SchemeCommodityMasterComponent } from './MasterNew/scheme-commodity-master/scheme-commodity-master.component';
import { PackingMasterComponent } from './MasterNew/packing-master/packing-master.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { IssuerMasterComponent } from './MasterNew/IssuerMaster/Issuer-master.component';
import { GodownMasterComponent } from './MasterNew/godown-master/godown-master.component';
import { FCIDataComponent } from './MasterNew/fcidata/fcidata.component';
import { AADSDataComponent } from './MasterNew/aadsdata/aadsdata.component';
import { HullingAgenciesComponent } from './MasterNew/hulling-agencies/hulling-agencies.component';
import { MRMDataComponent } from './MasterNew/mrmdata/mrmdata.component';
import { DepositorsComponent } from './MasterNew/supplierdata/depositors.component';
import { AllotmentIssueQuantityComponent } from './QuotaWatchRegister/allotment-issue-quantity.component';
import { StackCardMasterComponent } from './MasterNew/stack-card-master/stack-card-master.component';
import { QuantityMasterComponent } from './MasterNew/quantity-master/quantity-master.component';
import { UserMasterComponent } from './MasterNew/user-master/user-master.component';
import { MenuMasterComponent } from './MasterNew/menu-master/menu-master.component';
import { AllotmentQuantityComponent } from './MasterNew/allotment-quantity/allotment-quantity.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputFormatDirective } from './directives/input-format.directive';
import { FciBagTypeComponent } from './FCI/fci-bag-type/fci-bag-type.component';
import { FciCommodityMasterComponent } from './FCI/fci-commodity-master/fci-commodity-master.component';
import { FciOwnershipgroupTypeComponent } from './FCI/fci-ownershipgroup-type/fci-ownershipgroup-type.component';
import { FciHiredByComponent } from './FCI/fci-hired-by/fci-hired-by.component';
import { FciHiredFromComponent } from './FCI/fci-hired-from/fci-hired-from.component';
import { FciDistrictMasterComponent } from './FCI/fci-district-master/fci-district-master.component';
// import { FullCalendar } from 'primeng/fullcalendar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DepositorMasterComponent,
    TypeMasterComponent,
    TransactionMasterComponent,
    CerealNoncerealComponent,
    CommodityMasterComponent,
    RegionMasterComponent,
    GunnyTypeMasterComponent,
    TopbarComponent,
    VehicleMasterComponent,
    WeighmentMasterComponent,
    RailYardMasterComponent,
    SchemeMasterComponent,
    SchemeCommodityMasterComponent,
    PackingMasterComponent,
    IssuerMasterComponent,
    GodownMasterComponent,
    FCIDataComponent,
    AADSDataComponent,
    HullingAgenciesComponent,
    MRMDataComponent,
    DepositorsComponent,
    AllotmentIssueQuantityComponent,
    StackCardMasterComponent,
    QuantityMasterComponent,
    UserMasterComponent,
    MenuMasterComponent,
    AllotmentQuantityComponent,
    InputFormatDirective,
    FciBagTypeComponent,
    FciCommodityMasterComponent,
    FciOwnershipgroupTypeComponent,
    FciHiredByComponent,
    FciHiredFromComponent,
    FciDistrictMasterComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmDialogModule,
    FormsModule,
    TableModule,
    OverlayPanelModule,
    AppRoutingModule,
    // MenubarModule,
    BrowserAnimationsModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    FieldsetModule,
    CalendarModule,
    CardModule,
    PanelModule,
    TreeTableModule,
    SplitButtonModule,
    AutoCompleteModule,
    ToastModule,
    InputTextModule,
    TabViewModule,
    TooltipModule,
    BlockUIModule,
    ListboxModule,
    ProgressSpinnerModule,
    SidebarModule,
    ScrollPanelModule,
    // FullCalendar
    // ListboxModule,
    // ProgressSpinnerModule,
    // InputMaskModule,
    // FileUploadModule
    SlimLoadingBarModule,
    KeyFilterModule
  ],
  providers: [AuthService, ConfirmationService, TableConstants, StatusMessage, LoginService,
    DatePipe, RestAPIService, PathConstants, ExcelService, MessageService, RoleBasedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
