export class TableConstants {
    //Master Document
    DepositorMasterType: any;
    DepositorMasterTypeTenderer: any;
    TypeMaster: any;
    TransactionMaster: any;
    RegionMasterCols: any;
    CerealNonCerealItemMaster: any;
    CommodityMasterCols: any;
    VehicleMaster: any;
    WeighmentMaster: any;
    RailYardMaster: any;
    SchemeMaster: any;
    SchemeCommodityMaster: any;
    PackingMaster: any;
    godownProfile: any;
    IssuerMaster: any;
    GodownMaster: any;
    AadsData: any;
    FciData: any;
    HullingAgenciesData: any;
    MrmData: any;
    SupplierData: any;
    GunnyType: any;
    AllotmentIssueQuantity: any;
    StackCardMaster: any;
    QuantityAccount: any;
    UserMaster: any;
    MenuMaster: any;
    AllotmentCommodityCols: any;
    FciBagType: any;
    FciCommodityMaster: any;
    FciOwnershipGroup: any;
    FciOwnershipType: any;
    FciHiredBy: any;
    FciHiredFrom: any;
    FciDistrictMaster: any;

    constructor() {
        this.GodownMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'REGION NAME', field: 'RGNAME' },
            { header: 'TNCS Code', field: 'TNCSCode' },
            { header: 'TNCS Name', field: 'TNCSName' },
            { header: 'TNCS Capacity', field: 'TNCSCapacity' },
            { header: 'TNCS Carpet', field: 'TNCSCarpet' },
            { header: 'OPERATION TYPE', field: 'OPERATIONTYPE' },
            { header: 'TNCS Type', field: 'TNCSType' },
            // { header: 'DocStatus', field: 'DocStatus' },
            // { header: 'CB Statment', field: 'CBS' },
            // { header: 'Allotment', field: 'Allotment' },
            { header: 'DocStatus', field: 'DStatus' },
            { header: 'CB Statment', field: 'CBS' },
            { header: 'Allotment', field: 'ALT' },
            { header: 'PDS', field: 'PDS' },
            { header: 'DocApproval', field: 'Doc Approval' },
            { header: 'noofshopsociety', field: 'no of shopsociety' },
            { header: 'TaxInvoice', field: 'TaxInvoice' },
            { header: 'AdvancedDay', field: 'AdvancedDay' },
            { header: 'Active Flag', field: 'ActiveFlag' }
        ];

        this.RegionMasterCols = [
            { header: 'S.No.', field: 'SlNo' },
            { header: 'Region Code', field: 'RGCODE' },
            { header: 'Region Name', field: 'RGNAME' },
            { header: 'Address 1', field: 'Address1' },
            { header: 'Address 2', field: 'Address2' },
            { header: 'Phone No', field: 'PhoneNo' },
            { header: 'Pincode', field: 'Pincode' },
            { header: 'Email ID', field: 'Emailid' }
        ];

        this.DepositorMasterType = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Depositor Code', field: 'DepositorCode' },
            { header: 'Depositor Name', field: 'DepositorName' },
            { header: 'Depositor Type', field: 'DepositorType' },
            { header: 'Active Flag', field: 'ActiveFlag' }
        ];

        this.DepositorMasterTypeTenderer = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Depositor Code', field: 'DepositorCode' },
            { header: 'Depositor Name', field: 'DepositorName' },
            { header: 'Depositor Type', field: 'DepositorType' },
            { header: 'GST Number', field: 'Gst' },
            { header: 'Party ID', field: 'LedgerID' },
            { header: 'Active Flag', field: 'ActiveFlag' }
        ];

        this.TypeMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Type Code', field: 'Tycode' },
            { header: 'Type Name', field: 'Tyname' },
            { header: 'Type Transaction', field: 'TYTransaction' },
            { header: 'Type Transaction', field: 'TypeTran' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.TransactionMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Transaction Code', field: 'TRCode' },
            { header: 'Transaction Name', field: 'TRName' },
            { header: 'Transaction Type', field: 'TransactionTY' },
            { header: 'Transaction Type', field: 'TransType' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.CerealNonCerealItemMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Item Code', field: 'ITCode' },
            { header: 'Item Name', field: 'ITDescription' },
            { header: 'Item Type', field: 'ItemName' }
        ];

        this.CommodityMasterCols = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Item Code', field: 'ITCode' },
            { header: 'Item Name', field: 'ITDescription' },
            { header: 'Hsncode', field: 'Hsncode' },
            { header: 'Item Weighment', field: 'ITBweighment' },
            { header: 'IT Tax', field: 'ittax' },
            { header: 'GR Code', field: 'GRName' },
            { header: 'GR Name', field: 'MajorName' },
            { header: 'Item Type', field: 'ItemName' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' },
            { header: 'Allotment Group', field: 'Allotmentgroup' },
            { header: 'S Flag', field: 'SFlag' },
            { header: 'CB Flag', field: 'CBFlag' },
            { header: 'Unit', field: 'Unit' },
            { header: 'Group Name', field: 'GroupName' }
            // { header: 'GroupCode', field: 'Grouping' }

        ];

        this.VehicleMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Vehicle Code', field: 'VHCode' },
            { header: 'Vehicle Type', field: 'VHType' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.WeighmentMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Weighment Code', field: 'WECode' },
            { header: 'Weighment Type', field: 'WEType' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.RailYardMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Railway Yard Code', field: 'RYCode' },
            { header: 'Railway Yard Type', field: 'RYName' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.SchemeMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Scheme Code', field: 'SCCode' },
            { header: 'Scheme Name', field: 'Name' },
            { header: 'Scheme Type', field: 'SCType' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' },
            { header: 'Annavitran TNCSCID', field: 'AnnavitranTNCSCID' },
            { header: 'Allotment Scheme', field: 'AllotmentScheme' }
        ];

        this.SchemeCommodityMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            // { header: 'RowID', field: 'RowId' },
            { header: 'Scheme Code', field: 'SchemeCode' },
            { header: 'Scheme Name', field: 'SchemeName' },
            { header: 'Commodity Name', field: 'CommodityName' },
            { header: 'Active Flag', field: 'ActiveFlag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.PackingMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Packing Code', field: 'Pcode' },
            { header: 'Packing Name', field: 'PName' },
            { header: 'Packing Weight', field: 'PWeight' },
            { header: 'PBWeight', field: 'PBWeight' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.godownProfile = [
            { field: 'GNAME', header: 'Incharge Name' },
            { field: 'GodownCode', header: 'Godown Code' },
            { field: 'DESIG', header: 'Designation' },
            { field: 'ADD1', header: 'Address1' },
            { field: 'ADD2', header: 'Address2' },
            { field: 'ADD3', header: 'Address3' },
            { field: 'TELNO', header: 'Telephone No' },
            { field: 'MOBNO', header: 'Mobile No' },
            { field: 'FAXNO', header: 'Fax No' },
        ];

        this.IssuerMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { field: 'IssuerNo', header: 'Issuer No' },
            { field: 'IssuerCode', header: 'Issuer Code' },
            { field: 'Tyname', header: 'Type Name' },
            { field: 'SocietyName', header: 'Society Name' },
            { field: 'Issuername', header: 'Issuer Name' },
            { field: 'CategoryName', header: 'OWS - Category' },
            { field: 'Beneficiaries', header: 'No.of Beneficiary' },
            { field: 'ACSCode', header: 'Acs Code' },
            { field: 'Activeflag', header: 'Active' },
            // { header: 'Save'}
        ];

        this.MrmData = [
            { field: 'SlNo', header: 'S.No' },
            { field: 'DepositorName', header: 'Depositor Name' }
        ];

        this.HullingAgenciesData = [
            { field: 'SlNo', header: 'S.No' },
            { field: 'DepositorName', header: 'Depositor Name' }
        ];

        this.FciData = [
            { field: 'SlNo', header: 'S.No' },
            { field: 'DepositorName', header: 'Depositor Name' }
        ];

        this.AadsData = [
            { field: 'SlNo', header: 'S.No' },
            { field: 'RegionName', header: 'Region' },
            { field: 'AADSType', header: 'AADS Code' },
            { field: 'Name', header: 'AADS Name' },
        ];

        this.SupplierData = [
            { field: 'SlNo', header: 'S.No' },
            { field: 'DepositorCode', header: 'Depositor Code' },
            { field: 'Tyname', header: 'Depositor Type' },
            { field: 'DepositorName', header: 'Depositor Name' }
        ];

        this.GunnyType = [
            { field: 'SlNo', header: 'S.No' },
            { field: 'GTCODE', header: 'Gunny Type Code' },
            { field: 'GTType', header: 'Gunny Type Name' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.AllotmentIssueQuantity = [
            { header: 'S.No', field: 'SlNo' },
            { field: 'AllotmentMonth', header: 'Month' },
            // { field: 'SIDate', header: 'Date' },
            { field: 'SocietyCode', header: 'Society Name' },
            { field: 'SocietyName', header: 'Society Name' },
            // { field: 'Acscode', header: 'Shop Code' },
            // { field: 'IssuerName', header: 'Issuer Name' },
            { field: 'Commodity', header: 'Commodity' },
            { field: 'Scheme', header: 'Scheme' },
            { field: 'AllotmentQty', header: 'Allotment Quantity' },
            { field: 'IssueQty', header: 'Issue Quantity' },
            { field: 'Balance', header: 'Balance Quantity' }
        ];

        this.StackCardMaster = [
            { header: 'S.No', field: 'SlNo' },
            { field: 'RowId', header: 'Row Id' },
            { field: 'GodownCode', header: 'Godown Code' },
            { field: 'RegionCode', header: 'Region Code' },
            // { field: 'CommodityCode', header: 'Commodity Code' },
            { field: 'CommodityName', header: 'Commodity Name' },
            { field: 'StackNo', header: 'Stack No' },
            { field: 'StackBalanceBags', header: 'StackBalanceBags' },
            { field: 'ObStackDate', header: 'ObStackDate' },
            { field: 'CurYear', header: 'CurYear' },
            { field: 'Flag1', header: 'Flag1' },
            { field: 'clstackdate', header: 'clstackdate' },
        ];

        this.QuantityAccount = [
            { header: 'S.No', field: 'SlNo' },
            { field: 'HeaderName', header: 'Header Name' },
            { field: 'ReportType', header: 'Report Type' },
            { field: 'IsActive', header: 'Active/InActive' },
            { field: 'GroupId', header: 'Group Id' },
        ];

        this.UserMaster = [
            { header: 'S.No', field: 'SlNo' },
            { field: 'UserName', header: 'User Name' },
            { field: 'Pwd', header: 'Password' },
            { field: 'RoleId', header: 'Role Id' },
            { field: 'Regioncode', header: 'Region Code' },
            { field: 'GodownCode', header: 'Godown Code' },
            { field: 'RegionName', header: 'Region Name' },
            { field: 'GodownName', header: 'Godown Name' },
            { field: 'EMailId', header: 'EMail Id' },
            { field: 'EmpId', header: 'Employee Id' },
            { field: 'PhoneNumber', header: 'Phone Number' },
            { field: 'MappingId', header: 'Mapping Id' },
            { field: 'MappingName', header: 'Mapping Name' },
            { field: 'checkOTP', header: 'check OTP' },
            { field: 'Flag', header: 'Active' },
        ];

        this.MenuMaster = [
            { header: 'S.No', field: 'SlNo' },
            { field: 'MenuId', header: 'Menu ID' },
            { field: 'ID', header: 'ID' },
            { field: 'Name', header: 'Menu Name' },
            { field: 'URL', header: 'URL' },
            { field: 'ParentId', header: 'ParentId' },
            { field: 'IsActive', header: 'Active' },
            { field: 'RoleId', header: 'Role Id' },
        ];

        this.AllotmentCommodityCols = [
            { header: 'S.No', field: 'SlNo' },
            { field: 'Acommcode', header: 'Allotment Code' },
            { field: 'Acommname', header: 'Allotment Name' },
            { field: 'Acomm', header: 'Allotment Commodity' },
            { field: 'Asch', header: 'Allotment Scheme' }
        ];

        this.FciBagType = [
            { field: 'bag_type_id', header: 'Bag ID'},
            { field: 'bag_type_name', header: 'Bag Name'},
            { field: 'tare_weight', header: 'Tare Weight'}
        ];

        this.FciCommodityMaster = [
            { field: 'commodity_id', header: 'Commodity ID'},
            { field: 'commodity_name', header: 'Commodity Name'}
        ];

        this.FciOwnershipGroup = [
            { field: 'ownership_group_type', header: 'Ownership Group ID'},
            { field: 'ownership_group_Name', header: 'Ownership Group Name'}
        ];

        // this.FciOwnershipType = [
        //     { field: 'ownership_type', header: 'Ownership Type'},
        //     { field: 'ownership_Name', header: 'Ownership Name'}
        // ];

        this.FciHiredBy = [
            { field: 'hired_by_Id', header: 'Hired By ID'},
            { field: 'hired_by_Name', header: 'Hired By Name'}
        ];

        this.FciHiredFrom = [
            { field: 'hired_from_id', header: 'Hired From ID'},
            { field: 'hired_from_Name', header: 'Hired From Name'}
        ];

        this.FciDistrictMaster = [
            { field: 'lgd_district_name_en', header: 'LGD District Name'},
            { field: 'district_name_ll', header: 'District Name'},
            { field: 'lgd_district_code', header: 'District Code'},
            { field: 'lgd_state_code', header: 'State Code'},
            { field: 'RGNAME', header: 'Region Code'}
        ]
    }
}