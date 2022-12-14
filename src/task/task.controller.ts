import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDTO } from '../dto/update-task.dto';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {

    }

    @Get()
    public async getAll() {
        return await this.taskService.getAll()
    }

    @Get("/:id")
    public async getOne(@Param("id") taskId: number) {
        return await this.taskService.getOne(taskId)
    }

    @Post()
    public async createOne(@Body() createTaskRequest: CreateTaskDTO) {
        return await this.taskService.createOne(createTaskRequest)
    }

    @Put("/:id")
    public async updateOne(@Param("id") taskId: number, @Body() updateTaskRequest: UpdateTaskDTO) {
        const res = await this.taskService.updateOne(taskId, updateTaskRequest);
        return res
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteOne(@Param("id") taskId: number) {
        await this.taskService.deleteOne(taskId)
    }
}
