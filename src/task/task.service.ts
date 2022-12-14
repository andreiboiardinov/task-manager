import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { TaskDTO } from '../dto/task.dto';
import { UpdateTaskDTO } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

    private entityToDTO(task: Task): TaskDTO {
        const taskDTO = new TaskDTO();
        taskDTO.id = task.id;
        taskDTO.title = task.title;
        taskDTO.description = task.description;
        taskDTO.status = task.status;

        return taskDTO;
    }

    public async getAll() {
        const tasks: Task[] = await this.taskRepository.find()
        const tasksDTO: TaskDTO[] = tasks.map(task => this.entityToDTO(task))
        return tasksDTO
    }

    public async getOne(taskId: number) {
        const task: Task = await this.taskRepository.findOneBy({id: taskId})

        if (!task) throw new NotFoundException(`Task with id: ${taskId} was not found`)

        const taskDTO: TaskDTO = this.entityToDTO(task)

        return taskDTO
    }

    public async createOne(createTaskRequest: CreateTaskDTO) {
        const task: Task = new Task();
        task.title = createTaskRequest.title;
        task.description = createTaskRequest.description;
        task.status = TaskStatus.Created;

        await this.taskRepository.save(task);

        return this.entityToDTO(task)
    }

    public async updateOne(taskId: number, updateTaskRequest: UpdateTaskDTO) {
        // fetch and check if task exists
        const task: Task = await this.getOne(taskId)
        // check what properties are set in dto
        if (updateTaskRequest.title) task.title = updateTaskRequest.title;
        if (updateTaskRequest.description) task.description = updateTaskRequest.description;
        if (updateTaskRequest.status) task.status = updateTaskRequest.status;
        // update the properties in the task
        await this.taskRepository.save(task)
        // return the task as dto
        const taskDTO: TaskDTO = this.entityToDTO(task);
        return taskDTO
    }

    public async deleteOne(taskId: number) {
        // fetch and check if task exists
        const task: Task = await this.getOne(taskId)
        // delete the task
        await this.taskRepository.remove(task)
    }
}
