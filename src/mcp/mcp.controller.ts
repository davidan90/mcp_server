import { Controller, Get, Post, Patch, Body } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Controller("mcp")
export class MCPController {
  constructor(private readonly userService: UserService) {}

  @Get("context")
  async getContext() {
    const users = await this.userService.getAllUsers();
    return { users };
  }

  @Patch("context")
  async patchContext(@Body() body: { userId: number; isActive: boolean }) {
    const { userId, isActive } = body;
    const user = await this.userService.updateUser(userId, { isActive });
    return { udpated: user };
  }

  @Post("commands")
  async runCommand(@Body() body: { command: string; args: any }) {
    if (body.command === "deactivateUser") {
      const user = await this.userService.updateUser(body.args.userId, {
        isActive: false,
      });
      return { result: user };
    }

    return { error: "Comando no reconocido" };
  }
}
