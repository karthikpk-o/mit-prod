-- CreateTable
CREATE TABLE `BusinessUnit` (
    `BusinessUnit` VARCHAR(5) NOT NULL,
    `BName` VARCHAR(100) NULL,
    `BShortName` VARCHAR(20) NULL,
    `AddressLine1` VARCHAR(100) NULL,
    `AddressLine2` VARCHAR(100) NULL,
    `AddressLine3` VARCHAR(100) NULL,
    `CurrencyCode` CHAR(4) NULL,
    `IntraOrgnTBL` CHAR(1) NULL,
    `BUType` CHAR(1) NULL,
    `BBUType` CHAR(1) NULL,
    `SortOrder` INTEGER NULL,
    `BSortOrder` INTEGER NULL,
    `UserId` VARCHAR(5) NULL,
    `Datem` DATETIME NULL,
    `CreatedDate` DATETIME NULL,
    `EffStat` VARCHAR(1) NULL,
    `DefaultBank` VARCHAR(4) NULL,
    `IntraOrgn` VARCHAR(10) NULL,
    `IsPORelated` VARCHAR(1) NULL,
    `FromEmailAddr` VARCHAR(50) NULL,
    `FromEmailAddrPwd` VARCHAR(50) NULL,
    `RegardsNote` VARCHAR(100) NULL,
    `FinanceInchargeEmailId` VARCHAR(50) NULL,
    `ReportingInchargeEmailId` VARCHAR(100) NULL,
    `PanNo` VARCHAR(50) NULL,
    `GSTIN` VARCHAR(20) NULL,
    `PlaceofSupply` VARCHAR(20) NULL,
    `DefaultInstitute` VARCHAR(5) NOT NULL DEFAULT 'MAHE',
    `Isgroup` VARCHAR(1) NULL,
    `InterOrgAccount` VARCHAR(10) NULL,
    `IsSelfApproval` VARCHAR(1) NULL,
    `OBPermitted` VARCHAR(1) NULL,
    `TANGROUP` VARCHAR(1) NULL,
    `TAN` VARCHAR(50) NULL,
    `TANBU` VARCHAR(5) NULL,

    UNIQUE INDEX `BusinessUnit_BusinessUnit_key`(`BusinessUnit`),
    PRIMARY KEY (`BusinessUnit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `BusinessUnit` VARCHAR(10) NOT NULL,
    `UserID` VARCHAR(5) NOT NULL,
    `Name` VARCHAR(50) NULL,
    `Role` VARCHAR(50) NULL,
    `EmailID` VARCHAR(20) NOT NULL,
    `Status` VARCHAR(50) NULL,
    `DefModule` VARCHAR(1) NULL,
    `DefaultInstitute` VARCHAR(1) NULL,

    UNIQUE INDEX `Users_UserID_key`(`UserID`),
    UNIQUE INDEX `Users_EmailID_key`(`EmailID`),
    PRIMARY KEY (`BusinessUnit`, `UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserIDByBU_M` (
    `UserID` VARCHAR(5) NOT NULL,
    `BusinessUnit` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`UserID`, `BusinessUnit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `Id` VARCHAR(10) NOT NULL,
    `RoleName` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountType` (
    `Id` VARCHAR(1) NOT NULL,
    `Name` VARCHAR(20) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `Account` VARCHAR(10) NOT NULL,
    `EffDT` DATETIME(3) NOT NULL,
    `ADesc` VARCHAR(50) NULL,
    `DescShort` VARCHAR(10) NULL,
    `EffStat` VARCHAR(1) NULL,
    `ActType` CHAR(1) NULL,
    `OpenItemC` CHAR(1) NULL,
    `SundryCreditC` CHAR(1) NULL,
    `CustC` CHAR(1) NULL,
    `UserID` VARCHAR(5) NULL,
    `DateM` DATETIME(3) NULL,
    `isAfflMandatory` CHAR(1) NULL,
    `isTDS` CHAR(1) NULL,
    `CreatedDate` DATETIME(3) NULL,
    `isOprUnit` VARCHAR(1) NULL,
    `isBudget` VARCHAR(1) NULL,
    `IsSSubledger` VARCHAR(1) NULL,
    `IsHSubledger` VARCHAR(1) NULL,
    `IsSFLledger` VARCHAR(1) NULL,
    `ISHFLledger` VARCHAR(1) NULL,
    `ISSDemLedger` VARCHAR(1) NULL,
    `IsHAffiliate` VARCHAR(1) NULL,
    `IsSAffiliate` VARCHAR(1) NULL,

    PRIMARY KEY (`Account`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendor` (
    `VendorID` VARCHAR(10) NOT NULL,
    `VendName` VARCHAR(160) NULL,
    `VendorType` CHAR(1) NULL,
    `PanNo` VARCHAR(50) NULL,
    `VTypeDesc` VARCHAR(20) NULL,
    `Company` CHAR(1) NULL,
    `VendorStatus` CHAR(1) NULL,
    `EffStat` VARCHAR(1) NULL,
    `UserID` VARCHAR(5) NULL,
    `Datem` DATETIME(3) NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL,
    `VendorCategory` VARCHAR(4) NULL,
    `EmployeeCode` VARCHAR(15) NULL,
    `BU` VARCHAR(15) NULL,
    `CreatedBy` VARCHAR(10) NULL,
    `VendorTaxClassification` VARCHAR(20) NULL,
    `PVendorID` VARCHAR(10) NULL,
    `NumberOfEntries` INTEGER NULL,
    `VendorClass` VARCHAR(1) NULL,
    `BankDetailEditedBy` VARCHAR(5) NULL,
    `BankDetailsEditOn` DATETIME(3) NOT NULL,
    `BankDetailApprovedBy` VARCHAR(5) NULL,
    `BankDetailApprovedOn` DATETIME(3) NOT NULL,
    `NatureOfBusiness` VARCHAR(10) NULL,
    `Form16AEmail` VARCHAR(500) NULL,
    `BusinessCategory` VARCHAR(200) NULL,
    `Form16AUserID` VARCHAR(5) NULL,
    `Form16ADatem` DATETIME(3) NOT NULL,

    PRIMARY KEY (`VendorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendorDetails` (
    `VendorID` VARCHAR(10) NOT NULL,
    `Entry_No` INTEGER NOT NULL,
    `VAddress1` VARCHAR(100) NULL,
    `VAddress2` VARCHAR(100) NULL,
    `VAddress3` VARCHAR(100) NULL,
    `VCity` VARCHAR(50) NULL,
    `VState` VARCHAR(50) NULL,
    `VPinCode` VARCHAR(10) NULL,
    `VendorContact` VARCHAR(25) NULL,
    `LocalAddress` VARCHAR(500) NULL,
    `Fax` VARCHAR(30) NULL,
    `WebSiteURL` VARCHAR(100) NULL,
    `Email` VARCHAR(80) NULL,
    `VATSalesRegDetails` VARCHAR(100) NULL,
    `ServiceTaxRegNum` VARCHAR(20) NULL,
    `CSTRegNum` VARCHAR(20) NULL,
    `ESIRegNum` VARCHAR(20) NULL,
    `LabourContactRegNum` VARCHAR(20) NULL,
    `PFRegNum` VARCHAR(20) NULL,
    `AnyOtherDetails` VARCHAR(50) NULL,
    `BankName` VARCHAR(70) NULL,
    `BranchName` VARCHAR(70) NULL,
    `BankAddress` VARCHAR(100) NULL,
    `AccountNum` VARCHAR(70) NULL,
    `BeneficiaryName` VARCHAR(50) NULL,
    `IFSCCode` VARCHAR(70) NULL,
    `IsDocSubmitted` CHAR(1) NOT NULL,
    `GSTIN` VARCHAR(20) NULL,
    `StateCode` VARCHAR(20) NULL,
    `OldVendorId` VARCHAR(100) NULL,
    `AccountNumF` VARCHAR(50) NULL,
    `IFSCCodeF` VARCHAR(50) NULL,
    `VendorMobileNumber` VARCHAR(16) NULL,
    `IsInvoiceUploaded` VARCHAR(1) NULL,
    `GrpInsurance` VARCHAR(50) NULL,
    `GrpInsuranceExpDate` DATETIME(3) NULL,
    `EletricContractLicNum` VARCHAR(50) NULL,
    `ElectricContractLicExpDate` DATETIME(3) NULL,
    `SendMail` VARCHAR(1) NULL,
    `LabContractLicExpdate` DATETIME(3) NULL,
    `Form16AEmail` VARCHAR(100) NULL,
    `PaymentNotificationEmail` VARCHAR(80) NULL,

    PRIMARY KEY (`VendorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TreeNode` (
    `ID` VARCHAR(10) NOT NULL,
    `DisplayName` VARCHAR(20) NOT NULL,
    `DisplayOrder` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Functionalities` (
    `ID` VARCHAR(10) NOT NULL,
    `DisplayName` VARCHAR(50) NULL,
    `URL` VARCHAR(100) NOT NULL,
    `FG` VARCHAR(10) NOT NULL,
    `TreeNode` VARCHAR(10) NOT NULL,
    `Type` VARCHAR(1) NOT NULL,
    `DisplayOrder` INTEGER NOT NULL,
    `RoleID` VARCHAR(10) NULL,
    `Module` CHAR(10) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Affiliate` (
    `AffiliateBU` VARCHAR(5) NOT NULL,
    `AfBUName` VARCHAR(76) NOT NULL,

    UNIQUE INDEX `Affiliate_AfBUName_key`(`AfBUName`),
    PRIMARY KEY (`AffiliateBU`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voucher` (
    `BusinessUnit` VARCHAR(5) NOT NULL,
    `VoucherID` VARCHAR(8) NOT NULL,
    `VoucherStyle` VARCHAR(4) NULL,
    `InvoiceID` VARCHAR(50) NULL,
    `InvoiceDate` DATETIME(3) NULL,
    `VendorID` VARCHAR(10) NULL,
    `VoucherSource` VARCHAR(4) NULL,
    `EntryStatus` CHAR(1) NULL,
    `AccountingDate` DATETIME(3) NULL,
    `InvoiceAmount` DECIMAL(10, 2) NULL,
    `GrossAmount` DECIMAL(10, 2) NULL,
    `DueAmount` DECIMAL(10, 2) NULL,
    `LineNarration` VARCHAR(100) NULL,
    `LongNarration` VARCHAR(500) NULL,
    `CopiedToJournal` CHAR(1) NULL,
    `UserID` VARCHAR(5) NULL,
    `Datem` DATETIME(3) NULL,
    `ApprovedBy` VARCHAR(5) NULL,
    `ApprovedDate` DATETIME(3) NULL,
    `EnteredBy` VARCHAR(5) NULL,
    `EnteredDate` DATETIME(3) NULL,
    `HoldAmount` DECIMAL(10, 2) NULL,
    `HoldReason` VARCHAR(100) NULL,
    `APRef` VARCHAR(8) NULL,
    `Payment_Count` INTEGER NULL,
    `No_Of_VA_Entry` INTEGER NULL,
    `Inward_No` VARCHAR(100) NULL,
    `hasTDS` CHAR(1) NULL,
    `IsTDSExp` CHAR(1) NULL,
    `ActivationDate` DATETIME(3) NULL,
    `IsPrinted` VARCHAR(1) NULL,
    `PaymentType` VARCHAR(30) NULL,
    `InvoiceStatus` CHAR(1) NOT NULL,
    `VoucherLink` CHAR(2) NOT NULL,
    `IsCheqno` VARCHAR(1) NULL,
    `OnlinePaytype` VARCHAR(1) NULL,
    `Ismis` VARCHAR(1) NULL,
    `Misamount` DECIMAL(10, 2) NULL,
    `InwardBU` VARCHAR(5) NULL,
    `VoucherType` VARCHAR(3) NULL,
    `VoucherReferenceID` VARCHAR(30) NULL,
    `InputTax` VARCHAR(1) NULL,
    `VendorTaxClassification` VARCHAR(20) NULL,
    `GSTIN` VARCHAR(20) NULL,
    `StateCode` VARCHAR(20) NULL,
    `IGST` DOUBLE NULL,
    `SGST` DOUBLE NULL,
    `CGST` DOUBLE NULL,
    `RCM` VARCHAR(1) NULL,
    `TaxComponent` VARCHAR(10) NULL,
    `TaxPercentage` DOUBLE NULL,
    `IsInwardRCM` VARCHAR(1) NULL,
    `RCMID` VARCHAR(10) NULL,
    `IsFinInvc` VARCHAR(1) NULL,
    `SelfInvRefenerence` VARCHAR(16) NULL,
    `Entry_no` INTEGER NOT NULL,
    `SC_Institute` VARCHAR(5) NULL,
    `IsReversed` VARCHAR(1) NULL,
    `HasAsset` VARCHAR(1) NULL,
    `IsPrepaid` VARCHAR(1) NULL,
    `DeferCap` VARCHAR(1) NULL,
    `ApprovalUnit` VARCHAR(5) NULL,
    `PrepaidID` VARCHAR(8) NULL,
    `isMisUploaded` VARCHAR(1) NULL,
    `Cess` DOUBLE NULL,
    `unposted` VARCHAR(1) NULL,
    `IsInvest` VARCHAR(1) NULL,
    `DeferInv` VARCHAR(1) NULL,
    `IsServiceCharge` VARCHAR(1) NULL,
    `EmailCategory` VARCHAR(5) NULL,
    `IsSubVendor` VARCHAR(1) NULL,
    `SubVendor` VARCHAR(10) NULL,
    `Goods_Services` VARCHAR(5) NULL,
    `Goods_ServicesAmount` DECIMAL(10, 2) NULL,
    `GSTR1unit` VARCHAR(5) NULL,
    `TdsLimit` VARCHAR(2) NULL,
    `ServiceAmount` DECIMAL(10, 2) NULL,
    `TAXSection` VARCHAR(20) NULL,
    `TCSAmount` DOUBLE NULL,
    `ServiceAmount2` DECIMAL(10, 2) NULL,
    `TaxSection2` VARCHAR(20) NULL,
    `TDSsection_morethanOne` VARCHAR(1) NULL,
    `Goodsamount` DECIMAL(10, 2) NULL,
    `Goodssection` VARCHAR(20) NULL,
    `TdsLimitGoods` VARCHAR(1) NULL,
    `VendorApplicability` VARCHAR(1) NULL,
    `VendEInvoiceEnabled` VARCHAR(1) NULL,
    `UnPostDate` DATETIME(3) NULL,
    `unpostreason` VARCHAR(100) NULL,
    `GRNSRNDate` DATETIME(3) NULL,
    `DueDate` DATETIME(3) NULL,

    UNIQUE INDEX `Voucher_VoucherID_key`(`VoucherID`),
    PRIMARY KEY (`BusinessUnit`, `VoucherID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VoucherAccounting` (
    `BusinessUnit` VARCHAR(5) NOT NULL,
    `VoucherID` VARCHAR(8) NOT NULL,
    `VoucherLine` INTEGER NOT NULL,
    `Account` VARCHAR(10) NULL,
    `ActivityCode` VARCHAR(4) NULL,
    `ActivityReference` VARCHAR(10) NULL,
    `DeptID` VARCHAR(10) NULL,
    `OprUnit` VARCHAR(10) NULL,
    `AffilateBU` VARCHAR(10) NULL,
    `SubledgerUnit` VARCHAR(10) NULL,
    `OpenItem` VARCHAR(11) NULL,
    `VendorID` VARCHAR(10) NULL,
    `LineNarration` VARCHAR(100) NULL,
    `DebitCredit` VARCHAR(1) NULL,
    `Amount` DECIMAL(10, 2) NULL,
    `CopiedToJournal` CHAR(1) NULL,
    `UserID` VARCHAR(5) NULL,
    `Datem` DATETIME(3) NULL,
    `TaxType` VARCHAR(3) NULL,
    `Entry_no` INTEGER NULL,
    `CategoryID` VARCHAR(10) NULL,
    `entryType` VARCHAR(1) NULL,
    `AssetType` VARCHAR(1) NULL,
    `SubVendorID` VARCHAR(10) NULL,

    PRIMARY KEY (`BusinessUnit`, `VoucherID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BusinessUnit` ADD CONSTRAINT `BusinessUnit_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_Role_fkey` FOREIGN KEY (`Role`) REFERENCES `Role`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserIDByBU_M` ADD CONSTRAINT `UserIDByBU_M_BusinessUnit_fkey` FOREIGN KEY (`BusinessUnit`) REFERENCES `BusinessUnit`(`BusinessUnit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserIDByBU_M` ADD CONSTRAINT `UserIDByBU_M_BusinessUnit_UserID_fkey` FOREIGN KEY (`BusinessUnit`, `UserID`) REFERENCES `Users`(`BusinessUnit`, `UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_ActType_fkey` FOREIGN KEY (`ActType`) REFERENCES `AccountType`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor` ADD CONSTRAINT `Vendor_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor` ADD CONSTRAINT `Vendor_BU_fkey` FOREIGN KEY (`BU`) REFERENCES `BusinessUnit`(`BusinessUnit`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorDetails` ADD CONSTRAINT `VendorDetails_VendorID_fkey` FOREIGN KEY (`VendorID`) REFERENCES `Vendor`(`VendorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Functionalities` ADD CONSTRAINT `Functionalities_TreeNode_fkey` FOREIGN KEY (`TreeNode`) REFERENCES `TreeNode`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Functionalities` ADD CONSTRAINT `Functionalities_RoleID_fkey` FOREIGN KEY (`RoleID`) REFERENCES `Role`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_BusinessUnit_fkey` FOREIGN KEY (`BusinessUnit`) REFERENCES `BusinessUnit`(`BusinessUnit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_VendorID_fkey` FOREIGN KEY (`VendorID`) REFERENCES `Vendor`(`VendorID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_ApprovedBy_fkey` FOREIGN KEY (`ApprovedBy`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_EnteredBy_fkey` FOREIGN KEY (`EnteredBy`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoucherAccounting` ADD CONSTRAINT `VoucherAccounting_BusinessUnit_fkey` FOREIGN KEY (`BusinessUnit`) REFERENCES `BusinessUnit`(`BusinessUnit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoucherAccounting` ADD CONSTRAINT `VoucherAccounting_VoucherID_fkey` FOREIGN KEY (`VoucherID`) REFERENCES `Voucher`(`VoucherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoucherAccounting` ADD CONSTRAINT `VoucherAccounting_Account_fkey` FOREIGN KEY (`Account`) REFERENCES `Account`(`Account`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoucherAccounting` ADD CONSTRAINT `VoucherAccounting_AffilateBU_fkey` FOREIGN KEY (`AffilateBU`) REFERENCES `Affiliate`(`AfBUName`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoucherAccounting` ADD CONSTRAINT `VoucherAccounting_VendorID_fkey` FOREIGN KEY (`VendorID`) REFERENCES `Vendor`(`VendorID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoucherAccounting` ADD CONSTRAINT `VoucherAccounting_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;
