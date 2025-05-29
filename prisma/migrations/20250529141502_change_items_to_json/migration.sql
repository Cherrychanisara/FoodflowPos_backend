/*
  Warnings:

  - You are about to drop the column `change` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `menu_id` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `payment_amount` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `menu_id` on the `Item` table. All the data in the column will be lost.
  - Added the required column `items` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_bill_id_fkey`;

-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_menu_id_fkey`;

-- DropIndex
DROP INDEX `Item_bill_id_fkey` ON `Item`;

-- DropIndex
DROP INDEX `Item_menu_id_fkey` ON `Item`;

-- AlterTable
ALTER TABLE `Bill` DROP COLUMN `change`,
    DROP COLUMN `menu_id`,
    DROP COLUMN `payment_amount`,
    ADD COLUMN `items` JSON NOT NULL;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `menu_id`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `profileImage` VARCHAR(191) NULL;
