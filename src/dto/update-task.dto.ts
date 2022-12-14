import {TaskStatus} from '../entity/task.entity';

export class UpdateTaskDTO {
    title?: string;
    description?: string;
    status?: TaskStatus;
}