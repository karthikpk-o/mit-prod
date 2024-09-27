/*
  Warnings:

  - You are about to alter the column `Datem` on the `BusinessUnit` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CreatedDate` on the `BusinessUnit` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `VoucherAccounting` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `BusinessUnit` MODIFY `Datem` DATETIME NULL,
    MODIFY `CreatedDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `VendorDetails` MODIFY `Entry_No` INTEGER NULL;

-- AlterTable
ALTER TABLE `VoucherAccounting` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`BusinessUnit`, `VoucherID`, `VoucherLine`);
