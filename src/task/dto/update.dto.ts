import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class UpdateDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}