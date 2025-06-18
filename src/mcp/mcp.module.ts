import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { MCPController } from "./mcp.controller";

@Module({
  imports: [UserModule],
  controllers: [MCPController],
})
export class MCPModule {}
