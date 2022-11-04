import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegionMasterComponent } from './region-master/region-master.component';
import { AuthGuard } from './services/auth.guard';
import { GunnyTypeMasterComponent } from './gunny-type-master/gunny-type-master.component';
import { TransactionMasterComponent } from './MasterNew/transaction-master/transaction-master.component';
import { TypeMasterComponent } from './MasterNew/type-master/type-master.component';
import { DepositorMasterComponent } from './MasterNew/depositor-master/depositor-master.component';
import { CerealNoncerealComponent } from './MasterNew/cereal-noncereal/cereal-noncereal.component';
import { CommodityMasterComponent } from './MasterNew/commodity-master/commodity-master.component';
import { VehicleMasterComponent } from './MasterNew/vehicle-master/vehicle-master.component';
import { WeighmentMasterComponent } from './MasterNew/weighment-master/weighment-master.component';
import { RailYardMasterComponent } from './MasterNew/rail-yard-master/rail-yard-master.component';
import { SchemeMasterComponent } from './MasterNew/scheme-master/scheme-master.component';
import { SchemeCommodityMasterComponent } from './MasterNew/scheme-commodity-master/scheme-commodity-master.component';
import { PackingMasterComponent } from './MasterNew/packing-master/packing-master.component';
import { HomeComponent } from './home/home.component';
import { IssuerMasterComponent } from './MasterNew/IssuerMaster/Issuer-master.component';
import { GodownMasterComponent } from './MasterNew/godown-master/godown-master.component';
import { MRMDataComponent } from './MasterNew/mrmdata/mrmdata.component';
import { FCIDataComponent } from './MasterNew/fcidata/fcidata.component';
import { AADSDataComponent } from './MasterNew/aadsdata/aadsdata.component';
import { HullingAgenciesComponent } from './MasterNew/hulling-agencies/hulling-agencies.component';
import { DepositorsComponent } from './MasterNew/supplierdata/depositors.component';
import { AllotmentIssueQuantityComponent } from './QuotaWatchRegister/allotment-issue-quantity.component';
import { StackCardMasterComponent } from './MasterNew/stack-card-master/stack-card-master.component';
import { QuantityMasterComponent } from './MasterNew/quantity-master/quantity-master.component';
import { UserMasterComponent } from './MasterNew/user-master/user-master.component';
import { MenuMasterComponent } from './MasterNew/menu-master/menu-master.component';
import { AllotmentQuantityComponent } from './MasterNew/allotment-quantity/allotment-quantity.component';
import { FciBagTypeComponent } from './FCI/fci-bag-type/fci-bag-type.component';
import { FciCommodityMasterComponent } from './FCI/fci-commodity-master/fci-commodity-master.component';
import { FciOwnershipgroupTypeComponent } from './FCI/fci-ownershipgroup-type/fci-ownershipgroup-type.component';
import { FciHiredByComponent } from './FCI/fci-hired-by/fci-hired-by.component';
import { FciHiredFromComponent } from './FCI/fci-hired-from/fci-hired-from.component';
import { FciDistrictMasterComponent } from './FCI/fci-district-master/fci-district-master.component';
import { FciStateMasterComponent } from './FCI/fci-state-master/fci-state-master.component';
import { FciTehsildarMasterComponent } from './FCI/fci-tehsildar-master/fci-tehsildar-master.component';
import { FciOwnershipTypeComponent } from './FCI/fci-ownership-type/fci-ownership-type.component';
import { RolemappingMasterComponent } from './MasterNew/rolemapping-master/rolemapping-master.component';
import { ShopinactiveMasterComponent } from './MasterNew/shopinactive-master/shopinactive-master.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Home', component: HomeComponent},
  { path: 'GodownMaster', component: GodownMasterComponent, canActivate: [AuthGuard] },
  { path: 'DepositorMaster', component: DepositorMasterComponent, canActivate: [AuthGuard] },
  { path: 'TypeMaster', component: TypeMasterComponent, canActivate: [AuthGuard] },
  { path: 'TransactionMaster', component: TransactionMasterComponent, canActivate: [AuthGuard] },
  { path: 'CerealNoncereal', component: CerealNoncerealComponent, canActivate: [AuthGuard] },
  { path: 'CommodityMaster', component: CommodityMasterComponent, canActivate: [AuthGuard] },
  { path: 'VehicleMaster', component: VehicleMasterComponent, canActivate: [AuthGuard] },
  { path: 'WeighmentMaster', component: WeighmentMasterComponent, canActivate: [AuthGuard] },
  { path: 'RailwayYardMaster', component: RailYardMasterComponent, canActivate: [AuthGuard] },
  { path: 'SchemeMaster', component: SchemeMasterComponent, canActivate: [AuthGuard] },
  { path: 'SchemeCommodityMaster', component: SchemeCommodityMasterComponent, canActivate: [AuthGuard] },
  { path: 'PackingMaster', component: PackingMasterComponent, canActivate: [AuthGuard] },
  { path: 'IssuerMaster', component: IssuerMasterComponent, canActivate: [AuthGuard] },
  { path: 'RegionMaster', component: RegionMasterComponent, canActivate: [AuthGuard] },
  { path: 'GunnyType', component: GunnyTypeMasterComponent, canActivate: [AuthGuard] },
  { path: 'MrmData', component: MRMDataComponent, canActivate: [AuthGuard] },
  { path: 'FciData', component: FCIDataComponent, canActivate: [AuthGuard] },
  { path: 'AADS', component: AADSDataComponent, canActivate: [AuthGuard] },
  { path: 'HullingAgencies', component: HullingAgenciesComponent, canActivate: [AuthGuard] },
  { path: 'SuppliersData', component: DepositorsComponent, canActivate: [AuthGuard] },
  { path: 'StackCardUpdate', component: StackCardMasterComponent, canActivate: [AuthGuard] },
  { path: 'AllotmentAbstract', component: AllotmentIssueQuantityComponent, canActivate: [AuthGuard] },
  { path: 'QuantityAccountMaster', component: QuantityMasterComponent, canActivate: [AuthGuard] },
  { path: 'AllotmentQuantity', component: AllotmentQuantityComponent, canActivate: [AuthGuard] },
  { path: 'UserMaster', component: UserMasterComponent, canActivate: [AuthGuard] },
  { path: 'MenuMaster', component: MenuMasterComponent, canActivate: [AuthGuard] },
  { path: 'fcibagtype', component: FciBagTypeComponent },
  { path: 'fcicommoditymaster', component: FciCommodityMasterComponent},
  { path: 'fciownershipgrouptype', component:FciOwnershipgroupTypeComponent},
  { path: 'fcihiredby', component: FciHiredByComponent},
  { path: 'fcihiredfrom', component: FciHiredFromComponent},
  { path: 'fcidistrictmaster', component: FciDistrictMasterComponent},
  { path: 'fcistatemaster', component: FciStateMasterComponent},
  { path: 'fcitehsildarmapping', component: FciTehsildarMasterComponent},
  { path: 'fciownershiptype', component: FciOwnershipTypeComponent},
  {path: 'rolemaster', component: RolemappingMasterComponent},
  {path: 'shopinactive', component: ShopinactiveMasterComponent}
  // { path: '**', compone: LoginComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { 

  
}
