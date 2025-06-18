import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { MCPModule } from "./mcp/mcp.module";

@Module({
  imports: [UserModule, MCPModule],
})
export class AppModule {}
