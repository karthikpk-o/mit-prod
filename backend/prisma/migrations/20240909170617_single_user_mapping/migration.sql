/*
  Warnings:

  - You are about to alter the column `Datem` on the `BusinessUnit` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CreatedDate` on the `BusinessUnit` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `BusinessUnit` MODIFY `Datem` DATETIME NULL,
    MODIFY `CreatedDate` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_BusinessUnit_fkey` FOREIGN KEY (`BusinessUnit`) REFERENCES `BusinessUnit`(`BusinessUnit`) ON DELETE RESTRICT ON UPDATE CASCADE;
