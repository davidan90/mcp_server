import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async getAllUsers() {
    return prisma.user.findMany();
  }

  async updateUser(id: number, data: Partial<{ isActive: boolean }>) {
    return prisma.user.update({ where: { id }, data });
  }
}
