import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TaskService } from './task.service';
import { CreateDto } from "./dto/create.dto";
import { TaskStatus } from "./entities/task.entity";
import { UpdateDto } from "./dto/update.dto";

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @Body() createDto: CreateDto,
  ) {
    return this.taskService.createTask(createDto);
  }

  @Get('/paginate')
  async getPaginateTasks(
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.taskService.getPaginateTasks(page, limit);
  }

  @Get('')
  async getAllTasks(
    @Query('status') status?: TaskStatus
  ) {
    return this.taskService.getAllTasks(status);
  }

  @Get(':id')
  async getTask(
    @Param('id') id: number
  ) {
    return this.taskService.getTask(id);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateDto: UpdateDto
  ) {
    return await this.taskService.updateTask(id, updateDto)
  }

  @Delete(':id')
  async deleteTask(
    @Param('id') id: number
  ) {
    return await this.taskService.deleteTask(id)
  }
}
