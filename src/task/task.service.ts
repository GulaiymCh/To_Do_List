import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task, TaskStatus } from "./entities/task.entity";
import { Repository } from "typeorm";
import { CreateDto } from "./dto/create.dto";
import { UpdateDto } from "./dto/update.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async createTask(createDto: CreateDto): Promise<Task> {
    try {
      const {title, description, status} = createDto;
      const newTask = this.taskRepository.create({ title, description, status });
      return this.taskRepository.save(newTask);
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAllTasks(status?: TaskStatus): Promise<Task[]> {
    try {
      let query = {};
      if (status) {
        query = {where: {status}};
      }
      const tasks = await this.taskRepository.find(query);

      if (tasks.length === 0 ) {
        throw new NotFoundException("Task is empty");
      }
      return tasks;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getTask(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new NotFoundException("Task not found");
      }
      return task;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getPaginateTasks(page: number = 1, limit: number = 5) {
    try {
      const tasks = await this.taskRepository.find({
        skip: (page - 1) * limit,
        take: limit
      });

      if (tasks.length === 0 ) {
        throw new NotFoundException(`Page ${page} not found`);
      }

      return tasks;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateTask(taskId: number, updateDto: UpdateDto): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id: taskId } });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      Object.assign(task, updateDto);
      return await this.taskRepository.save(task);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async deleteTask(taskId: number): Promise<object> {
    try {
      const task = await this.taskRepository.findOne({ where: { id: taskId } });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      await this.taskRepository.delete(taskId);
      return { message: 'Task successfully deleted' };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
