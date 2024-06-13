/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hello` ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `username` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `createdBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NULL,
    ADD COLUMN `refreshTokenExpires` INTEGER NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    ADD COLUMN `username` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `surname` VARCHAR(191) NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_refreshToken_key` ON `user`(`refreshToken`);
