import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  title?: string;
  description?: string;
  due_time?: Date;
}
export class AssignTaskDto extends PartialType(CreateTaskDto) {
  user_id: number;
  task_id: number;
}
