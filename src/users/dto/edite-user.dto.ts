import { PartialType } from "@nestjs/mapped-types";
import { DeleteUserDto } from "./delete-user.dto";

export class EditeUserDto extends PartialType(DeleteUserDto) { }