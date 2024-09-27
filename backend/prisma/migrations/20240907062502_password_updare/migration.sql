/*
  Warnings:

  - You are about to alter the column `Datem` on the `BusinessUnit` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CreatedDate` on the `BusinessUnit` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `Password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BusinessUnit` MODIFY `Datem` DATETIME NULL,
    MODIFY `CreatedDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `Password` VARCHAR(500) NOT NULL;
