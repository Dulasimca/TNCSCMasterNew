export class PathConstants {

  ///Common
  public static readonly REGION_DATA = '/api/Region';
  public static readonly GODOWN_DATA = '/api/GodownMaster';
  public static readonly DASHBOARD = '/api/MasterDashboard';
  public static readonly NOTIFICATIONS = '/api/notifications';
  public static readonly TNCSC_SETTINGS = '/api/Settings';

  ///MASTER DOCUMENT
  public static readonly GODOWN_MASTER_GET = '/api/ManageGodownMaster/Get';
  public static readonly GODOWN_MASTER_POST = '/api/ManageGodownMaster/Post';
  public static readonly DEPOSITOR_TYPE_MASTER = '/api/TypeMaster/Get';
  public static readonly DEPOSITOR_MASTER_TYPE_GET = '/api/ManageDepositorsMaster/Get';
  public static readonly DEPODITOR_MASTER_TYPE_POST = '/api/ManageDepositorsMaster/Post';
  public static readonly TYPE_MASTER_POST = '/api/ManageTypeMaster/Post';
  public static readonly TRANSACTION_MASTER = '/api/TransactionMaster';
  public static readonly TRANSACTION_MASTER_POST = '/api/ManageTransactionMaster/Post';
  public static readonly TRANSACTION_MASTER_GET = '/api/ManageTransactionMaster';
  public static readonly ITEM_MASTER = '/api/ItemMaster';
  public static readonly ITEM_MASTER_GET = '/api/ManageItemMaster';
  public static readonly CEREAL_MASTER_POST = '/api/ManageItemMaster/Post';
  public static readonly MAJOR_ITEM_MASTER = '/api/MajorItemMaster';
  public static readonly COMMODITY_MASTER_POST = '/api/ManageItemMaster/Post';
  public static readonly VEHICLE_MASTER = '/api/VehicleMaster';
  public static readonly VEHICLE_MASTER_POST = '/api/ManageVehicleMaster/Post';
  public static readonly WEIGHMENT_MASTER = '/api/ManageWeighmentMaster';
  public static readonly WEIGHMENT_MASTER_POST = '/api/ManageWeighmentMaster/Post';
  public static readonly RAILWAY_YARD_MASTER = '/api/ManageRailwayYardMaster';
  public static readonly RAILWAY_YARD_MASTER_POST = '/api/ManageRailwayYardMaster/Post';
  public static readonly SCHEME_MASTER = '/api/Scheme';
  public static readonly SCHEME_MASTER_POST = '/api/ManageSchemesMaster/Post';
  public static readonly SCHEME_MASTER_GET = '/api/ManageSchemesMaster';
  public static readonly SCHEME_COMMODITY_MASTER = '/api/SchemeCommodity';
  public static readonly SCHEME_COMMODITY_GET = '/api/ManageSchemeCommodity/Get';
  public static readonly SCHEME_COMMODITY_POST = '/api/ManageSchemeCommodity/Post';
  public static readonly PACKING_AND_WEIGHMENT = '/api/PackingandWeighment';
  public static readonly PACKING_MASTER_POST = '/api/ManagePackingMaster/Post';
  public static readonly PACKING_MASTER_GET = '/api/ManagePackingMaster';
  public static readonly ISSUER_MASTER_GET = '/api/IssuerMaster/Get';
  public static readonly ISSUER_MASTER_PUT = '/api/IssuerMaster/Put';
  public static readonly ISSUER_MASTER_POST = '/api/IssuerMaster/Post';
  public static readonly SOCIETY_MASTER_GET = '/api/SocietyMaster/Get';
  public static readonly TYPE_CATEGORY_GET = '/api/TypeCategoryMaster/Get';
  public static readonly AADS = '/api/AADS';
  public static readonly MRN = '/api/MRN';
  public static readonly HULLING_AGENCIES = '/api/HullingAgencies';
  public static readonly FCI = '/api/FCI';
  public static readonly DEPOSITOR = '/api/Suppliers';
  public static readonly GUNNY_TYPE_GET = '/api/ManageGunnyTypeMaster';
  public static readonly GUNNY_TYPE_POST = '/api/ManageGunnyTypeMaster/Post';

  public static readonly ALLOTMENT_COMMODITY_GET = '/api/AllotmentCommodity';
  public static readonly ALLOTMENT_COMMODITY_POST = '/api/AllotmentCommodity/Post';
  public static readonly ALLOTMENT_GROUP_GET = '/api/AllotmentGroupMaster';
  
  public static readonly ALLOTMENT_QUANTITY_GET = '/api/AllotmentQuantity/Get';
  public static readonly ALLOTMENT_QUANTITY_POST = '/api/AllotmentQuantity/Post';

  public static readonly QUANTITY_ACCOUNT_GET = '/api/ManageQuantityAccount/Get';
  public static readonly QUANTITY_ACCOUNT_POST = '/api/ManageQuantityAccount/Post';

  //StackCard
  public static readonly STACK_CARD_GET = '/api/ManageStackCardMaster/Get';
  public static readonly STACK_CARD_UPDATE_POST = '/api/ManageStackCardMaster/Post';
  public static readonly STACK_YEAR = '/api/Accounting';

  ///Masters
  public static readonly REGION_POST = '/api/ManageRegionMaster/Post';

  ///Menu&Login
  public static readonly MENU = '/api/Menu/Get';
  public static readonly LOGIN = '/api/Users/Get';
  public static readonly CHANGE_PASSWORD_POST = '/api/Users/Post';
  public static readonly GODOWN_PROFILE_POST = '/api/GodownProfiles/Post';
  public static readonly GODOWN_PROFILE_GET = '/api/GodownProfiles/Get';

  ///UserMaster
  public static readonly ROLE_MAPPING = '/api/RoleMapping';
  public static readonly USER_MASTER_GET = '/api/ManageUserMaster/Get';
  public static readonly USER_MASTER_POST = '/api/ManageUserMaster/Post';
  public static readonly USERMASTER_POST = '/api/UserMaster/Post';
  public static readonly USERMASTER_GET = '/api/UserMaster';

  ///MenuMaster
  public static readonly MENU_MASTER_GET = '/api/ManageMenuMaster/Get';
  public static readonly MENU_MASTER_POST = '/api/ManageMenuMaster/Post';

  ///Settings
  public static readonly SETTINGS_GET = '/api/Settings';

  ///TrackIP
  public static readonly IMAGE_UPLOAD = '/api/Upload';


}
